from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView

from myapp.utils.gemini import get_trade_insight

from .serializers import CartPaymentSerializer, CartSerializer, CategorySerializer, ConfirmedTradeSerializer, EquipmentBookingSerializer, EquipmentPaymentSerializer, RegisterSerializer, LoginSerializer, TradeSerializer, UserSerializer, EquipmentSerializer, EquipmentDeliverySerializer, ProductSerializer, TradeRequestSerializer
from rest_framework.permissions import AllowAny, BasePermission
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import HasRole, IsOwner, IsEquipmentOwner, IsProductOwner
from rest_framework import viewsets
from rest_framework import generics
from .models import Cart, CartPayment, Category, ConfirmedTrade, Equipment, EquipmentBooking, EquipmentDelivery, EquipmentPayment, Product, Trade, TradeRequest, get_total_cart_cost
from rest_framework import serializers
from .models import CartDelivery
from .serializers import CartDeliverySerializer, DashboardSliderSerializer
from django.utils.encoding import force_str


# Create your views here.
from django.conf import settings
import stream_chat
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse

# Initializing Stream Chat
client = stream_chat.StreamChat(api_key=settings.STREAM_API_KEY, api_secret=settings.STREAM_API_SECRET)





# This is for trade insights from the gemini API
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def generate_trade_summary(request):
    trade_text = request.data.get('trade_text')
    
    if not trade_text:
        return Response({'error': 'Trade text is required.'}, status=400)
    
    summary = get_trade_insight(trade_text)
    return Response({'summary': summary})

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    
    def perform_create(self, serializer):
        user = serializer.save()
        
        # Register user in stream chat
        try:
            client.upsert_user({
                "id": str(user.id),
                "name": user.username
            })
        except Exception as e:
            print(f"Stream user creation failed during register: {e}")
            
            # This registers the user right after Django creates them.
            
            

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)    
            user_serializer = UserSerializer(user)
            
            
            try:
                client.upsert_user({
                    "id": str(user.id),
                    "name": user.username
                })
            except Exception as e:
                print(f"Stream user creation failed during login: {e}")
                
                # This ensures that even if the user was registered before Stream integration, they're still added to Stream during login.
            return Response(
                {'refresh' : str(refresh),
                 'access' : str(refresh.access_token),
                 'user': user_serializer.data},
               
            )
        else:
            return Response({'details' :"Invalid Credentials"}, status=401)  
        
# Product chat
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_product_chat(request, product_id):
    # Get the logged-in user
    sender = request.user
    sender_id = str(sender.id)
    
    # Get the product and owner
    product = get_object_or_404(Product, id=product_id)
    receiver = product.user
    receiver_id = str(receiver.id)
    
    # Prevent self-chat
    if sender_id == receiver_id:
        return Response({"error": "You cannot chat with yourself."}, status=400)
    
    # Upsert both users to Stream
    try:
        client.upsert_users([
            {"id": sender_id, "name": sender.username},
            {"id": receiver_id, "name": receiver.username},
        ])
    except Exception as e:
        return Response({"error": "Failed to sync users with Stream.", "details": str(e)}, status=500)
    
    # Create a unique channel ID based on product and users
    channel_id = f"product_{product.id}_{sender_id}_{receiver_id}"
    
    try:
        # Check if the channel already exists
        channel = client.channel('messaging', channel_id)
        existing_channel = channel.query()  # Attempt to query the channel
        if existing_channel:
            product_data = {
                "id": product.id,
                "name": product.name,
                "image": product.product_image.url if product.product_image else None
            }
            return Response({
                "message": "Chat already exists.",
                "channel_id": channel_id,
                "product_id": product.id,
                "receiver_id": receiver_id,
                "product": product_data
            })
    except Exception as e:
        # If channel doesn't exist, proceed to create it
        pass
    
    try:
        # Create the channel
        channel = client.channel('messaging', channel_id, {
            "members": [sender_id, receiver_id],
            "product_id": str(product.id),
            "created_by": sender_id,
        })
        channel.create(sender_id)
    except Exception as e:
        return Response({"error": "Failed to create channel.", "details": str(e)}, status=500)
    
    try:
        channel.send_message(
            user_id=sender_id,  # Add the user_id parameter
            message={
                "text": f"I want to buy this product {product.name}!",
                "attachments": [
                    {
                    "type": "image",
                    "image_url": request.build_absolute_uri(product.product_image.url),
                    "fallback": product.name,
                    }
                ],
                
                "user": {"id": sender_id, "name": sender.username},
                "product": {
                    "id": product.id,
                    "name": product.name,
                    "image": product.product_image.url if product.product_image else None,
                },
            }
        )
        print("Message sent successfully.")
    except Exception as e:
        print(f"Error sending message: {str(e)}")
        return Response({"error": "Failed to send message.", "details": str(e)}, status=500)
    
    product_data = {
        "id": product.id,
        "name": product.name,
        "image": product.product_image.url if product.product_image else None
    }
    
    return Response({
        "message": "Chat created successfully.",
        "channel_id": channel.id,
        "product_id": product.id,
        "receiver_id": receiver_id,
        "product": product_data
    })



@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_trade_chat(request, trade_id):
    # Get the logged-in user
    sender = request.user
    sender_id = str(sender.id)
    
    # Get the product and owner
    trade = get_object_or_404(Trade, id=trade_id)
    receiver = trade.user
    receiver_id = str(receiver.id)
    
    # Prevent self-chat
    if sender_id == receiver_id:
        return Response({"error": "You cannot chat with yourself."}, status=400)
    
    # Upsert both users to Stream
    try:
        client.upsert_users([
            {"id": sender_id, "name": sender.username},
            {"id": receiver_id, "name": receiver.username},
        ])
    except Exception as e:
        return Response({"error": "Failed to sync users with Stream.", "details": str(e)}, status=500)
    
    # Create a unique channel ID based on product and users
    channel_id = f"trade_{trade.id}_{sender_id}_{receiver_id}"
    
    try:
        # Check if the channel already exists
        channel = client.channel('messaging', channel_id)
        existing_channel = channel.query()  # Attempt to query the channel
        if existing_channel:
            trade_data = {
                "id": trade.id,
                "name": trade.product.name,
                "image": trade.product.product_image.url if trade.product.product_image else None
            }
            return Response({
                "message": "Chat already exists.",
                "channel_id": channel_id,
                "trade_id": trade.id,
                "receiver_id": receiver_id,
                "trade": trade_data
            })
    except Exception as e:
        # If channel doesn't exist, proceed to create it
        pass
    
    try:
        # Create the channel
        channel = client.channel('messaging', channel_id, {
            "members": [sender_id, receiver_id],
            "product_id": str(trade.id),
            "created_by": sender_id,
        })
        channel.create(sender_id)
    except Exception as e:
        return Response({"error": "Failed to create channel.", "details": str(e)}, status=500)
    
    try:
        channel.send_message(
            user_id=sender_id,  # Add the user_id parameter
            message={
                "text": f"I want to trade this product {trade.product.name}!",
                "attachments": [
                    {
                    "type": "image",
                    "image_url": request.build_absolute_uri(trade.product.product_image.url),
                    "fallback": trade.product.name,
                    }
                ],
                
                "user": {"id": sender_id, "name": sender.username},
                "trade": {
                    "id": trade.id,
                    "name": trade.product.name,
                    "image": trade.product.product_image.url if trade.product.product_image else None,
                },
            }
        )
        print("Message sent successfully.")
    except Exception as e:
        print(f"Error sending message: {str(e)}")
        return Response({"error": "Failed to send message.", "details": str(e)}, status=500)
    
    trade_data = {
        "id": trade.id,
        "name": trade.product.name,
        "image": trade.product.product_image.url if trade.product.product_image else None
    }
    
    return Response({
        "message": "Chat created successfully.",
        "channel_id": channel.id,
        "trade_id": trade.id,
        "receiver_id": receiver_id,
        "trade": trade_data
    })

    

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class DashboardView(APIView):

    permission_classes = [IsAuthenticated, ]
    
    required_role = 'user'    # this added for permissions are checked and  only the added here will  be autherized 
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        
        return Response({
            'message' : 'Welcome to Dashboard',
            'user': user_serializer.data
        }, status=200)


# View for chat messages from stream
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_stream_token(request):
   
    
    # We need to generate a token for logged-in user
    
    user_id = str(request.user.id)
    token = client.create_token(user_id)
    username= request.user.username
    print(token,settings.STREAM_API_KEY, username)
    
    return JsonResponse({"token" : token, "user_id": user_id,
                         "username": username, "stream_api_key": settings.STREAM_API_KEY})
   
   
class GetDashboardSliderData(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]
    def get_queryset(self):
        return Product.objects.order_by('-created_at')[:5]
    

    
        # To list and create the Equipment
class EquipmentListCreateView(generics.ListCreateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()
    
    def get_serializer_context(self):
        return {'request': self.request}      #This allows the serializer to access the request object 
    #and use it for context-specific operations (e.g., getting the currently authenticated user).

    # This method overrides the perform_create method
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # The serializer.save(user=self.request.user) call saves the new Equipment instance, setting the user field to the currently authenticated user (self.request.user).

         
class EquipmnentListByOwner(generics.ListAPIView):
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Equipment.objects.filter(user=self.request.user)
    
# class for update, delete and retrieve the equipment
class EquipmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny,]
        
        else:
            self.permission_classes = [IsAuthenticated, IsOwner]
        return super().get_permissions()
    
    def get_serializer_context(self):
        return {'request': self.request}
    
class EquipmentPartialUpdateView(generics.UpdateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)

class EquipmentBookingListCreateView(generics.ListCreateAPIView):
    queryset = EquipmentBooking.objects.all()
    serializer_class = EquipmentBookingSerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [IsAuthenticated, IsEquipmentOwner]
        
        else:
            self.permission_classes = [IsAuthenticated]
        return super().get_permissions()
    
    # def get_serializer_context(self):
    #     return {'request': self.request}
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
    
class EquipmentBookingUpdateStatusView(generics.UpdateAPIView) :
    queryset = EquipmentBooking.objects.all()
    serializer_class = EquipmentBookingSerializer
    permission_classes = [IsAuthenticated, IsEquipmentOwner]
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    
    
class EquipmentPaymentView(generics.ListCreateAPIView):
    queryset = EquipmentPayment.objects.all()
    serializer_class = EquipmentPaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        
        equipment_booking_id = self.request.data.get("equipment_booking")
        if not EquipmentBooking.objects.filter(id=equipment_booking_id).exists():
            raise serializers.ValidationError({"equipment_booking": "Invalid booking ID."})

        serializer.save(user=self.request.user)

class EquipmentDeliveryListCreateView(generics.ListCreateAPIView):
    queryset = EquipmentDelivery.objects.all()
    serializer_class = EquipmentDeliverySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        # Get the logged-in user
        user = self.request.user

        # Filter deliveries where the equipment's owner is the logged-in user
        return EquipmentDelivery.objects.filter(
            equipment_payment__equipment_booking__equipment__user=user
        )
    
class EquipmentDeliveryUpdateView(generics.UpdateAPIView):
    queryset = EquipmentDelivery.objects.all()
    serializer_class = EquipmentDeliverySerializer
    permission_classes = [IsAuthenticated]


class EquipmentDeliveryReceiveListView(generics.ListAPIView):
    queryset = EquipmentDelivery.objects.all()
    serializer_class = EquipmentDeliverySerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        
        return EquipmentDelivery.objects.filter(equipment_payment__equipment_booking__user=user)
    
    
    
    # Now for Products
    
class CategoryView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    
    
    
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    
    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, HasRole] 
            self.required_role = 'farmer'
        else:
            self.permission_classes = [IsAuthenticatedOrReadOnly]
        return super().get_permissions()
    
    
class ProductOwnerListView(generics.ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.filter(user= self.request.user)
    

class ProductListUpdateDeleteView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        else:
            self.permission_classes = [IsAuthenticated, IsOwner]
        return super().get_permissions()

class CartListCreateView(generics.ListCreateAPIView):
    # queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        return {'request': self.request}   
    def perform_create(self, serializer):
        user = self.request.user
        product_id = self.request.data.get('product_id')
        product_qty = self.request.data.get('product_qty')
        
        print(f'Product ID: ${product_id} and Product QTY: ${product_qty}')
        
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product does not exist.")
        
        # Check if the product is already in the cart
        if Cart.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError("This product is already in the cart.")
        
        
        serializer.save(user=user, product=product, product_qty=product_qty)
    
    def get_queryset(self):
        return Cart.objects.filter(user= self.request.user)
        
class CartDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Cart.objects.filter(user=self.request.user)
    
    def partial_update(self, request, *args, **kwargs):

        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)    


    def update(self, request, *args, **kwargs):
        
        cart_item = self.get_object()   #Gets the cart item 
        # Check if 'product_id' is provided and update product
        product_id = request.data.get('product_id')
        if product_id:
            try:
                product= Product.objects.get(id=product_id)
                cart_item.product = product  #Updating the product explicitly
            
            except Product.DoesNotExist:
                raise serializers.ValidationError("Product does not exist.")
            
         # Update 'product_qty' if provided    
        product_qty = request.data.get('product_qty')
        if product_qty is not None:
            cart_item.product_qty = product_qty
        
         # Update 'is_selected' if provided
        is_selected = request.data.get('is_selected')
        if is_selected is not None:
            cart_item.is_selected = is_selected   # Update selection status
        
        # Save the cart item after updating
        cart_item.save()
        return super().update(request, *args, **kwargs)
    
class CartTotalCostView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        total_cost = get_total_cart_cost(request.user)
        email = request.user.email
        return Response({"total_cost": total_cost, "email": email})
    

class CartPaymentListCreateView(generics.ListCreateAPIView):
    queryset = CartPayment.objects.all()
    serializer_class = CartPaymentSerializer
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        return {"request": self.request}
    
    


class CartDeliveryListCreateView(generics.ListAPIView):
    """
    Get all deliveries or create a new delivery.
    """
    serializer_class = CartDeliverySerializer
    permission_classes = [IsAuthenticated]
        
    def get_queryset(self):
        return CartDelivery.objects.filter(cart_payment__user=self.request.user).order_by('-created_at')

        
        
class CartDeliveryAdminListCreateView(generics.ListCreateAPIView):
    """
    Get all deliveries or create a new delivery By the Admin.
    """
    queryset = CartDelivery.objects.all()
    serializer_class = CartDeliverySerializer
    permission_classes = [IsAuthenticated]
    

    
    
class CartDeliveryDetailView(generics.RetrieveUpdateAPIView):
    """
    Retrieve or update a specific cart delivery.
    """
    queryset = CartDelivery.objects.all()
    serializer_class = CartDeliverySerializer
    permission_classes = [IsAuthenticated]
    
    def partial_update(self, request, *args, **kwargs):
        """
        Custom partial update logic to handle setting admin.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        if not instance.admin:
            instance.admin = self.request.user  # Set the admin if it's not already set
            instance.save()  # Save the instance again to update the admin field

        return Response(serializer.data)

    def perform_update(self, serializer):
        serializer.save()  # Save the instance



class CartDeliveryOwnerViewListView(generics.ListAPIView):
    serializer_class = CartDeliverySerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return CartDelivery.objects.filter(cart_payment__cart__product__user=self.request.user)
    

    
    

    
    
    
    # Trade Views     # 
class TradeListCreateView(generics.ListCreateAPIView):
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Trade.objects.filter(user=self.request.user)
    

    def get_serializer_context(self):
        return {'request': self.request}
    
    def create(self, request, *args, **kwargs):
        print("Received data:", request.data)  # Debugging
        return super().create(request, *args, **kwargs)

class TradeAllListView(generics.ListAPIView):
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer
    permission_classes = [AllowAny,]
    

    
class TradeRetiveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Trade.objects.all()
    serializer_class = TradeSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return super().update(request, *args, **kwargs)
class TradeRequestListCreateView(generics.ListCreateAPIView):
    queryset = TradeRequest.objects.all()
    serializer_class = TradeRequestSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return TradeRequest.objects.filter(user=self.request.user)

    def get_serializer_context(self):
        return {'request': self.request}

    def perform_create(self, serializer):
        user = self.request.user
        trade = serializer.validated_data.get("trade")

        # Check if the user has already requested this trade
        if TradeRequest.objects.filter(user=user, trade=trade).exists():
            raise serializers.ValidationError("You already have an existing trade request of this product.")

        serializer.save(user=user)



class TradeRequestOwnersListView(generics.ListAPIView):
    queryset = TradeRequest.objects.all()
    serializer_class = TradeRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return TradeRequest.objects.filter(trade__product__user=self.request.user)
    
class TradeRequestOwnersUpdateView(generics.UpdateAPIView):
    queryset = TradeRequest.objects.all()
    serializer_class = TradeRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)
    
    
    def perform_update(self, serializer):
        instance = serializer.instance  # Get the existing TradeRequest instance
        previous_status = instance.status  # Store the old status before update
        serializer.save()  # Update the TradeRequest instance
        
        # If status changed to 'accepted' and wasn't already accepted
        if previous_status != 'accepted' and instance.status == 'accepted':
            # Check if a ConfirmedTrade already exists to prevent duplicates
            if not ConfirmedTrade.objects.filter(trade_request=instance).exists():
                ConfirmedTrade.objects.create(trade_request=instance)
    
    
    
    
    

class ConfirmedTradeListByOwnerView(generics.ListAPIView):
    serializer_class = ConfirmedTradeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return ConfirmedTrade.objects.filter(trade_request__trade__product__user=self.request.user)
    
    
class ConfirmedTradeUpdateByOwnerView(generics.UpdateAPIView):
    queryset = ConfirmedTrade.objects.all()
    serializer_class = ConfirmedTradeSerializer
    permission_classes = [IsAuthenticated]

    def partial_update(self, request, *args, **kwargs):
        
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)



class ConfirmedTradeListView(generics.ListAPIView):
    queryset = ConfirmedTrade.objects.all()
    serializer_class = ConfirmedTradeSerializer
    permission_classes = [IsAuthenticated]
    
    queryset = ConfirmedTrade.objects.all()
    def get_queryset(self):
        return ConfirmedTrade.objects.filter(trade_request__user=self.request.user)
    

class ConfirmedTradeUpdateByUser(generics.UpdateAPIView):
    queryset = ConfirmedTrade.objects.all()
    serializer_class = ConfirmedTradeSerializer
    permission_classes = [IsAuthenticated]
    
    def partial_update(self, request, *args, **kwargs):
        kwargs['partial'] = True
        return self.update(request, *args, **kwargs)