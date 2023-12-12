from api.models import Blog, CustomUser
from rest_framework import serializers
from rest_framework.authtoken.views import Token
from rest_framework.response import Response

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=CustomUser
        fields='__all__'
        extra_kwargs = {'password':{
            'write_only':True,
            'required':True
        }}
    def create(self, validated_data):
        user=CustomUser(
            name=validated_data['name'],
            email=validated_data['email'],
        )
        user.set_password(validated_data['password'])
        user.save()
        Token.objects.create(user=user)
        return user

class BlogSerializer(serializers.ModelSerializer):
    class Meta:
        model=Blog
        fields='__all__'