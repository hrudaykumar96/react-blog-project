from django.shortcuts import render
from api.models import Blog, CustomUser
from api.serializers import BlogSerializer, UserSerializer
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class UserSerializer(viewsets.ModelViewSet):
    queryset=CustomUser.objects.all()
    serializer_class=UserSerializer

class BlogViewset(viewsets.ModelViewSet):
    queryset=Blog.objects.all().order_by('-created_date')
    serializer_class=BlogSerializer
    authentication_classes=[TokenAuthentication]
    permission_classes=[IsAuthenticated]