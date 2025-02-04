
from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.conf import settings
from django.conf.urls.static import static

from myapp.views import RegisterView, LoginView, DashboardView


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/register/', RegisterView.as_view(), name="auth_register"),
    path('api/auth/login/', LoginView.as_view(), name="auth_login"),
    path('api/auth/dashboard/', DashboardView.as_view(), name="dashbaord"),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/', include('myapp.urls')),
 
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

