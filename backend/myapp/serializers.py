from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserRole, Role
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')
        
class RegisterSerializer(serializers.ModelSerializer):
 
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        
        
    def create(self, validated_data):
        # Extract role information
    
         
         #create a new user
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])
        
    
        # Assign the role if provided
       
        role = Role.objects.get(name='user')
        UserRole.objects.create(user=user, role=role)
           
        return user   
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, write_only=True)
    
    # def validate(self, data):