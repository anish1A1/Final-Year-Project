from rest_framework import serializers
from django.contrib.auth.models import User
from .models import FarmerProfile, UserRole, Role, Equipment
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        
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
