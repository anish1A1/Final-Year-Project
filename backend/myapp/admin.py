from django.contrib import admin
from myapp.models import UserRole, Role
# Register your models here.

admin.site.register(Role)
admin.site.register(UserRole)

