from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
class CustomUserManager(BaseUserManager):
    
    def create_user(self, email, name, password=None):
        if not email:
            raise ValueError("email requeired")
        user=self.model(
            email=self.normalize_email(email),
            name=name,
        )
        user.set_password(password)
        user.save(using=self.db)
        return user
    def create_superuser(self, email, name, password=None):
        user=self.create_user(
            email,
            password=password,
            name=name
        )
        user.is_admin=True
        user.save(using=self.db)
        return user
    
class CustomUser(AbstractBaseUser):
    email=models.EmailField(unique=True, blank=False, verbose_name='Email')
    name=models.CharField(max_length=100, blank=False)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    username=None
    first_name=None
    last_name=None

    objects = CustomUserManager()

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name']

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        return self.is_admin

    def has_module_perms(self, app_label):
        return True
    @property
    def is_staff(self):
        return self.is_admin






class Blog(models.Model):
    title=models.CharField(max_length=50, null=False)
    description=models.TextField(null=False)
    image=models.ImageField(upload_to='images/', blank=True)
    created_date=models.DateTimeField(auto_now_add=True, editable=False)