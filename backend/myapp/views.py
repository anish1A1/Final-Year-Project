from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer, EquipmentSerializer, EquipmentStockSerializer
from rest_framework.permissions import AllowAny, BasePermission
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import HasRole
from rest_framework import viewsets
from rest_framework import generics
from .models import Equipment, EquipmentStock
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

class IsOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user            
    #This will check if the user the object is belonging to is equal to the user making the request. 
    # This is used to ensure that only the owner of an object can access it.


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
        
       
# This method will List and create the quantity and Available stock of the Equipment 
class EquipmentStockListCreateView(generics.ListCreateAPIView):
    queryset = EquipmentStock.objects.all()
    serializer_class = EquipmentStockSerializer
    permission_classes = [IsAuthenticated]   
    
    def perform_create(self, serializer):
        equipment = Equipment.objects.get(id=self.request.data['equipment'])  # Get the equipment object from the request data
        serializer.save(equipment=equipment)
        
# This method will delete, update and List by ID the quantity and Available stock of the Equipment 
class EquipmentStockDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = EquipmentStock.objects.all()
    serializer_class = EquipmentStockSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    
    def perform_create(self, serializer):
        equipment = Equipment.objects.get(id=self.request.data['equipment'])  # Get the equipment object from the request data
        serializer.save(equipment=equipment)
    
         
         
# class for update, delete and retrieve the equipment
class EquipmentDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Equipment.objects.all()
    serializer_class = EquipmentSerializer
    # permission_classes = [IsAuthenticatedOrReadOnly, IsOwner]
    
    def get_permissions(self):
        if self.request.method == 'GET':
            self.permission_classes = [AllowAny]
        
        else:
            self.permission_classes = [IsAuthenticated, IsOwner]
        return super().get_permissions()
    
    def get_serializer_context(self):
        return {'request': self.request}
    
