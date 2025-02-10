from django.contrib import admin
from myapp.models import UserRole, Role, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment
# Register your models here.

admin.site.register(Role)
admin.site.register(UserRole)
admin.site.register(FarmerProfile)
admin.site.register(Equipment)
admin.site.register(EquipmentBooking)
admin.site.register(EquipmentPayment)





