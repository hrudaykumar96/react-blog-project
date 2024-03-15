from django.urls import path, include
from .views import *
from rest_framework.routers import DefaultRouter

router=DefaultRouter()
router.register("blogs",BlogViewSets)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/users/', UserAPIView.as_view()),
    path('api/auth/', LoginAPIView.as_view()),
    path('api/home/', GetDataAPIView.as_view()),
    path('api/reset/', PasswordResetAPIView.as_view()),
]