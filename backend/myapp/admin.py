from django.contrib import admin
from myapp.models import UserRole, Role, FarmerProfile
# Register your models here.

admin.site.register(Role)
admin.site.register(UserRole)
admin.site.register(FarmerProfile)


