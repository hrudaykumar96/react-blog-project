from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.db import models
from .managers import CustomUserManager



class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    name = models.CharField(max_length=150)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.email
    

class Blog(models.Model):
    title=models.CharField(max_length=1000)
    description=models.TextField()
    image=models.ImageField(null=True,default='profile.jpg')
    author = models.ForeignKey(CustomUser, related_name='blogs', on_delete=models.CASCADE)
    class Meta:
        ordering = ['-id']