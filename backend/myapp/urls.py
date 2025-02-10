from django.urls import path
from .views import EquipmentListCreateView, EquipmentDetailView, EquipmentBookingListCreateView, EquipmentBookingUpdateStatusView, EquipmentPaymentView, EquipmentDeliveryUpdateView, EquipmentDeliveryListCreateView

urlpatterns = [
    path('equipment/', EquipmentListCreateView.as_view(), name='equipment-list-create'),
    path('equipment/<int:pk>/', EquipmentDetailView.as_view(), name='equipment-detail'),
    path('equipment-bookings/', EquipmentBookingListCreateView.as_view(), name='equipment-booking-list-create'),
    path('equipment-bookings/<int:pk>/', EquipmentBookingUpdateStatusView.as_view(), name='equipment-bookings-update-status'),
    path('equipment-payments/', EquipmentPaymentView.as_view(), name='equipment-payments-list-create'),
    path('equipment-delivery/', EquipmentDeliveryListCreateView.as_view(), name='equipment-delivery-list-create'),
    path('equipment-delivery/<int:pk>/', EquipmentDeliveryUpdateView.as_view(), name='equipment-delivery-update'),
]
