from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Cart, CartDelivery, CartPayment, Category, FarmerProfile, Product, UserRole, Role, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Role, UserRole
from .models import Trade, TradeRequest, ConfirmedTrade
class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name']

class UserRoleSerializer(serializers.ModelSerializer):
    role = RoleSerializer()
    class Meta:
        model = UserRole
        fields = ['role']
        
        

class UserSerializer(serializers.ModelSerializer):
    user_roles = UserRoleSerializer(many=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'user_roles']
        
class RegisterSerializer(serializers.ModelSerializer):
    farm_location = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    occupation_name = serializers.CharField(write_only=True, required=False, allow_blank=True, allow_null=True)
    role = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role', 'farm_location', 'occupation_name')
        
        
    def create(self, validated_data):
        farm_location = validated_data.pop('farm_location', None)
        occupation_name = validated_data.pop('occupation_name', None)
        role_name = validated_data.pop('role', 'user')
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        
        role = Role.objects.get(name=role_name)
        user_role = UserRole.objects.create(user=user, role=role)
        
        if role.name == 'farmer' and farm_location and occupation_name:
            FarmerProfile.objects.create(user_role=user_role, farm_location=farm_location, occupation_name=occupation_name)
        
        return user   

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    


class EquipmentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Equipment
        fields = '__all__'
        
    def create(self, validated_data):
        # Sets the user from the context
        user = self.context['request'].user
        validated_data['user'] = user
        print("validated Data: ", validated_data)
        return super().create(validated_data)

class EquipmentBookingSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    total_date = serializers.SerializerMethodField()
    total_cost = serializers.SerializerMethodField()
    class Meta:
        model = EquipmentBooking
        fields = '__all__'
        read_only_fields = ['total_date', 'total_cost']
    def get_total_date(self, obj):
        return obj.total_date
    
    def validate(self, data):
        # Check if the equipment is already booked by the same user
        user =self.context['request'].user
        equipment = data.get('equipment')
        
        if EquipmentBooking.objects.filter(equipment=equipment, user=user).exists():
            raise serializers.ValidationError("Equipment is already booked by you")
        return data
    
    def get_total_cost(self, obj):
        return obj.total_cost
        
    def create(self, validated_data):
        # Sets the user from the context
        user = self.context['request'].user
        validated_data['user'] = user
        print("validated Data: ", validated_data)
        return super().create(validated_data)

    # def update(self, instance, validated_data):
    #     validated_data['user'] = self.context['request'].user
    #     return super().update(instance, validated_data)
    
    
    
    # def create(self, validated_data):
    #     # Sets the user from the context
    #     user = self.context['request'].user
    #     validated_data['user'] = user
    #     print("validated Data: ", validated_data)
    #     return super().create(validated_data)
    

class EquipmentPaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    equipment_booking = serializers.PrimaryKeyRelatedField(queryset=EquipmentBooking.objects.all())
  
    class Meta:
        model = EquipmentPayment
        fields = '__all__'
        
    def validate(self, data):
        user = self.context['request'].user
        equipment_booking = data.get('equipment_booking')
        
        if EquipmentPayment.objects.filter(user=user, equipment_booking=equipment_booking).exists():
            raise serializers.ValidationError("You have already made a payment for this booking")
        return data
    
    def create(self, validated_data):
        payment = super().create(validated_data)
        # if payment.status ==  EquipmentPayment.PaymentStatusChoices.CLEARED:
        EquipmentDelivery.objects.create(equipment_payment=payment)
        return payment
    
    
class EquipmentDeliverySerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    equipment_payment = EquipmentPaymentSerializer()
    
    class Meta:
        model = EquipmentDelivery
        fields = '__all__'
        


# Now For Products


class CategorySerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Category
        fields = '__all__' 


class ProductSerializer(serializers.ModelSerializer):
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), source='category', write_only=True)
    category = CategorySerializer(read_only=True)
    total_time = serializers.SerializerMethodField();
    product_owner = serializers.SerializerMethodField();
    class Meta:
        model = Product
        fields = ['category', 'category_id', 'user', 'name', 'id', 'slug', 
                  'product_image','small_description', 'quantity', 'description', 'original_price', 'selling_price', 'tag', 'delivery_sell_charge', 'created_at', 'total_time','product_owner' ]
    
    def get_total_time(self, obj):
        return obj.total_time
    
    def get_product_owner(self, obj):
        """
        Return the username of the product owner
        """
        return obj.user.username
    
    
class CartSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(), write_only = True, 
                                                    source='product')
    total_cost = serializers.SerializerMethodField()
    class Meta:
        model = Cart
        fields = ['id', 'product_id', 'user', 'product', 
                  'product_qty', 'created_at', 'is_selected', 'total_cost']
        
        # extra_kwargs = {
        #     'product_qty: {required: False}'
        # }
       
    def get_total_cost(self, obj):
        return obj.total_cost
    
    def validate_product_qty(self, value):
        product_id = self.initial_data.get('product_id')  # Or from the request data
        if not product_id:
            raise serializers.ValidationError("Product ID is required.")
            
        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            raise serializers.ValidationError("Product does not exist.")
        
        if value > product.quantity:
            raise serializers.ValidationError(f'Only {product.quantity} is available')
    
        return value

   
    def validate(self, data):
        user = self.context['request'].user
        product = data.get('product')
        
        # product_id = self.initial_data.get('product')
        # print("user: ", user)
        # print("product_id: ", product_id)
        
        # Check if the user created the product
        if product.user == user:
            raise serializers.ValidationError('You cannot add a product you created to your cart.')

        # Check if the product already exists in the user's cart
        if not self.instance and Cart.objects.filter(user=user, product=product).exists():
            raise serializers.ValidationError('Product already exists in cart')
        
        return data
 
    def create(self, validated_data):
        # Sets the user from the context
        user = self.context['request'].user
        validated_data['user'] = user
        print("validated Data: ", validated_data)
        return super().create(validated_data)

    
class CartPaymentSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source = 'user.username')
    email = serializers.ReadOnlyField(source = 'user.email')
    cart = serializers.PrimaryKeyRelatedField(queryset=Cart.objects.all(), many=True)
    cart_name = CartSerializer(read_only=True, many=True, source='cart')
    class Meta:
        model = CartPayment
        fields = '__all__'
        
    def create(self, validated_data):
        user = self.context['request'].user
        carts = validated_data.pop('cart')   #Extracting the cart items before saving
        validated_data['user'] = user
        payment = CartPayment.objects.create(**validated_data)

        # Set ManyToMany carts
        payment.cart.set(carts)
        CartDelivery.objects.create(cart_payment=payment)
        return payment
        





class CartDeliverySerializer(serializers.ModelSerializer):
    cart_payment = CartPaymentSerializer(read_only=True)
    admin_username = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = CartDelivery
        fields = '__all__'

    def update(self, instance, validated_data):
        """
        Custom update logic to handle delivery status changes.
        """
        
        if not instance.admin:
            instance.admin = self.context['request'].user 
        
        instance.status = validated_data.get('status', instance.status)
        instance.delivery_date = validated_data.get('delivery_date', instance.delivery_date)
        instance.item_received_by_user = validated_data.get('item_received_by_user', instance.item_received_by_user)
        instance.delivery_location = validated_data.get('delivery_location', instance.delivery_location)
        instance.handover_date = validated_data.get('handover_date', instance.handover_date)
        
        instance.save()
        return instance
    
    def get_admin_username(self, obj):
        return obj.admin.username if obj.admin else None
    

    
        
        
class TradeSerializer(serializers.ModelSerializer):
    user_name = serializers.ReadOnlyField(source='user.username')
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all(),
                                                 write_only = True, source = 'product')
    total_amount = serializers.SerializerMethodField();
    
    class Meta:
        model = Trade
        fields = ['id', 'product', 'product_id', 'user', 'user_name', 'created_at', 'wanted_product', 'wanted_price', 'wanted_quantity', 
                  'note', 'trade_ending_date', 'total_amount']
        
        def create(self, validated_data):
            user = self.context['request'].user
            validated_data['user'] = user
            return Trade.objects.create(**validated_data)
            
        
    # def validate(self, data):
    #     user = self.context['request'].user
    #     product_id = self.initial_data.get('product')

    #     print("user: ", user)
    #     print("product_id: ", product_id)
    #     return data
    
    
    
    def get_total_amount(self,obj):
        return obj.wanted_price * obj.wanted_quantity
   
   

class TradeRequestSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField();
    user = serializers.ReadOnlyField(source='user.username')
    trade = TradeSerializer(read_only=True)
    trade_id = serializers.PrimaryKeyRelatedField(queryset=Trade.objects.all(), 
                                               write_only=True, source='trade')
    total_cost = serializers.SerializerMethodField();
    class Meta:
        model = TradeRequest
        fields = ['id', 'trade', 'user', 'trade_id', 'delivery_location', 'product_name', 
                  'status', 'note', 'image', 'price', 'quantity', 'total_cost']
        
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
    
    def get_total_cost(self, obj):
        return obj.price * obj.quantity
    

class ConfirmedTradeSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField();
    trade_request_id = serializers.PrimaryKeyRelatedField(queryset=TradeRequest.objects.all(), 
                                               write_only=True, source='trade_request')
    trade_request =TradeRequestSerializer(read_only=True);
                                    
    class Meta:
        model = ConfirmedTrade
        fields = ['id', 'trade_request', 'trade_request_id', 'created_at', 'updated_at', 'status', 'item_received', 'item_location']
        
        
        