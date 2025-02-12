from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import CategorySerializer, EquipmentBookingSerializer, EquipmentPaymentSerializer, RegisterSerializer, LoginSerializer, UserSerializer, EquipmentSerializer, EquipmentDeliverySerializer, ProductSerializer
from rest_framework.permissions import AllowAny, BasePermission
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import HasRole, IsOwner, IsEquipmentOwner
from rest_framework import viewsets
from rest_framework import generics
from .models import Category, Equipment, EquipmentBooking, EquipmentDelivery, EquipmentPayment, Product
from rest_framework import serializers

# Create your views here.


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
    

class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)    
            user_serializer = UserSerializer(user)
            
            return Response(
                {'refresh' : str(refresh),
                 'access' : str(refresh.access_token),
                 'user': user_serializer.data},
               
            )
        else:
            return Response({'details' :"Invalid Credentials"}, status=401)  
        

class UserDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
    def get_object(self):
        return self.request.user

class DashboardView(APIView):

    permission_classes = [IsAuthenticated, IsOwner, IsEquipmentOwner ]
    
    required_role = 'user'    # this added for permissions are checked and  only the added here will  be autherized 
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        
        return Response({
            'message' : 'Welcome to Dashboard',
            'user': user_serializer.data
        }, status=200)

        # To list and create the Equipment
class EquipmentListCreateView(generics.ListCreateAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()
    
    def get_serializer_context(self):
        return {'request': self.request}      #This allows the serializer to access the request object 
    #and use it for context-specific operations (e.g., getting the currently authenticated user).

    # This method overrides the perform_create method
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        # The serializer.save(user=self.request.user) call saves the new Equipment instance, setting the user field to the currently authenticated user (self.request.user).

         
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
    permission_classes = [IsAuthenticated]
    
    
class ProductListCreateView(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            self.permission_classes = [IsAuthenticated, HasRole] 
            self.required_role = 'farmer'
        else:
            self.permission_classes = [AllowAny]
        return super().get_permissions()
    