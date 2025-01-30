from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserRole, Role
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        
class RegisterSerializer(serializers.ModelSerializer):
    role = serializers.CharField(write_only=True, required=False)
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'role')
        
        
    def create(self, validated_data):
        # Extract role information
        role_name = validated_data.pop('role', None)
         
         #create a new user
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        
    
        # Assign the role if provided
        if role_name:
            try:
                role = Role.objects.get(name=role_name)
                UserRole.objects.create(user=user, role=role)
            except Role.DoesNotExist:
                raise serializers.ValidationError(f"Role '{role_name}' does not exist.")
        return user   
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    # def validate(self, data):