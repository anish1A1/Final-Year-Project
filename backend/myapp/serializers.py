from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Category, FarmerProfile, Product, UserRole, Role, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Role, UserRole

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
        validated_data['user'] = self.context['request'].user
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
        if payment.status ==  EquipmentPayment.PaymentStatusChoices.CLEARED:
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
    class Meta:
        model = Product
        fields = ['category', 'category_id', 'user', 'id', 'slug', 'product_image','small_description', 'quantity', 'description', 'original_price', 'selling_price', 'tag', 'delivery_sell_charge', 'created_at', 'total_time' ]
    
    def get_total_time(self, obj):
        return obj.total_time