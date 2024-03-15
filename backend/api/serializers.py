from rest_framework import serializers
from .models import *
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import ValidationError

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields='__all__' 


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = '__all__'
        extra_kwargs = {
            'password': {'write_only': True}
        }
    
class LoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields = ['email', 'password']
        extra_kwargs={
            'password':{'write_only':True}
        }

class GetDataSerializer(serializers.ModelSerializer):
    blogs = BlogSerializer(many=True)

    class Meta:
        model=CustomUser
        fields=['email','id','name','blogs']


class PasswordResetSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields=['email','password']