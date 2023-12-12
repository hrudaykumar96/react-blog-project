from django.urls import path, include
from api.views import BlogViewset, UserSerializer
from rest_framework.routers import DefaultRouter


router=DefaultRouter()
router.register('users',UserSerializer)
router.register('blogs',BlogViewset)
urlpatterns=[
    path('',include(router.urls)),
]