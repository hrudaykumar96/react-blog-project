from .models import *
from .serializers import *
from rest_framework import viewsets
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class BlogViewSets(viewsets.ModelViewSet):
    queryset=Blog.objects.all()
    serializer_class=BlogSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]


class UserAPIView(APIView):
    def post(self,request):
        serializer=UserSerializer(data=request.data)
        serializer.is_valid()
        email=request.data.get("email")
        name=request.data.get("name")
        password=request.data.get("password")
        if CustomUser.objects.filter(email=email).exists():
            return Response("email already registered")
        user=CustomUser.objects.create(email=email,name=name)
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return Response("registered successfully")

    

class LoginAPIView(APIView):
    def post(self,request):
        serializer=LoginSerializer(data=request.data)
        email=request.data.get("email")
        password=request.data.get("password")
        serializer.is_valid()
        if CustomUser.objects.filter(email=email).exists():
            user=authenticate(email=email, password=password)
            if user is not None:
                token=Token.objects.get(user=user)
                return Response({"blogs_token":token.key})
            return Response("incorrect password")
        return Response("email not registered")


class GetDataAPIView(APIView):
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]
    def get(self,request):
        serializer=GetDataSerializer(request.user)
        return Response(serializer.data)
    

class PasswordResetAPIView(APIView):
    def post(self, request):
        serializer = PasswordResetSerializer(data=request.data)
        serializer.is_valid()
        email = request.data.get("email")
        password = request.data.get("password")
        user = CustomUser.objects.filter(email=email).first()
        if user:
            user.set_password(password)
            user.save()
            return Response("password reset successfully")
        else:
            return Response("email not registered")