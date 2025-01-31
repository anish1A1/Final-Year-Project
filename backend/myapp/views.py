from django.shortcuts import render
from rest_framework import generics
from django.contrib.auth.models import User
from rest_framework.views import APIView
from .serializers import RegisterSerializer, LoginSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .permissions import HasRole
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
                #  'redirect_url': '/'
            )
        else:
            return Response({'details' :"Invalid Credentials"}, status=401)  
        
        

class DashboardView(APIView):
    permission_classes = [IsAuthenticated, HasRole]
    required_role = 'user'    # this added for permissions are checked and  only the added here will  be autherized 
    def get(self, request):
        user = request.user
        user_serializer = UserSerializer(user)
        return Response({
            'message' : 'Welcome to Dashboard',
            'user': user_serializer.data
        }, status=200)