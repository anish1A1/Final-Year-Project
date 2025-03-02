from django.contrib import admin
from myapp.models import UserRole, Role, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Product, Category, Cart,Trade, TradeRequest, ConfirmedTrade, CartPayment, CartDelivery, CartProductDelivery
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
admin.site.register(Cart)
admin.site.register(Trade)
admin.site.register(TradeRequest)
admin.site.register(ConfirmedTrade)
admin.site.register(CartPayment)
admin.site.register(CartDelivery)
admin.site.register(CartProductDelivery)
