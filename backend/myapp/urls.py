from django.urls import path
from .views import EquipmentListCreateView, EquipmentDetailView, EquipmentBookingListCreateView, EquipmentBookingUpdateStatusView, EquipmentPaymentView, EquipmentDeliveryUpdateView, EquipmentDeliveryListCreateView, EquipmentDeliveryReceiveListView, CategoryView, ProductListCreateView, CategoryView, ProductOwnerListView,ProductListUpdateDeleteView
from .views import CartListCreateView, CartDetailView
urlpatterns = [
    path('equipment/', EquipmentListCreateView.as_view(), name='equipment-list-create'),
    path('equipment/<int:pk>/', EquipmentDetailView.as_view(), name='equipment-detail'),
    path('equipment-bookings/', EquipmentBookingListCreateView.as_view(), name='equipment-booking-list-create'),
    path('equipment-bookings/<int:pk>/', EquipmentBookingUpdateStatusView.as_view(), name='equipment-bookings-update-status'),
    path('equipment-payments/', EquipmentPaymentView.as_view(), name='equipment-payments-list-create'),
    path('equipment-delivery/', EquipmentDeliveryListCreateView.as_view(), name='equipment-delivery-list-create'),
    path('equipment-delivery/<uuid:pk>/', EquipmentDeliveryUpdateView.as_view(), name='equipment-delivery-update'),
    path('equipment-delivery-receive/', EquipmentDeliveryReceiveListView.as_view(), name='equipment-delivery-receive'),
    path('category/', CategoryView.as_view(), name='category-list-view'),
    path('product/', ProductListCreateView.as_view(), name='product-list-create'),
    path('category/', CategoryView.as_view(), name='category-list-view'),
    path('product-user/', ProductOwnerListView.as_view(), name='product-user-list-view'),
    path('product-list/<int:pk>/', ProductListUpdateDeleteView.as_view(), name='product-list-update-delete'),
    path('cart/', CartListCreateView.as_view(), name='cart-list-create'),
    path('cart/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),
    # path('trades/', TradeListCreateView.as_view(), name='trade-list-create'),
    # path('trade-requests/', TradeRequestListCreateView.as_view(), name='trade-request-list-create'),
       
]
