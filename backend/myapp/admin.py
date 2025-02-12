from django.contrib import admin
from myapp.models import UserRole, Role, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Product, Category
# Register your models here.

admin.site.register(Role)
admin.site.register(UserRole)
admin.site.register(FarmerProfile)
admin.site.register(Equipment)
admin.site.register(EquipmentBooking)
admin.site.register(EquipmentPayment)
admin.site.register(EquipmentDelivery)
admin.site.register(Product)
admin.site.register(Category)




