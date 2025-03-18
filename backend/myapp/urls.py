from django.urls import path
from .views import CartPaymentListCreateView, EquipmentListCreateView, EquipmentDetailView, EquipmentBookingListCreateView, EquipmentBookingUpdateStatusView, EquipmentPaymentView, EquipmentDeliveryUpdateView, EquipmentDeliveryListCreateView, EquipmentDeliveryReceiveListView, CategoryView, ProductListCreateView, CategoryView, ProductOwnerListView,ProductListUpdateDeleteView, TradeListCreateView, TradeRequestListCreateView
from .views import CartListCreateView, CartDetailView, TradeAllListView, TradeRequestOwnersUpdateView, TradeRequestOwnersListView, TradeRetiveUpdateDestroyView
from .views import ConfirmedTradeListByOwnerView, ConfirmedTradeUpdateByOwnerView, ConfirmedTradeListView, ConfirmedTradeUpdateByUser, CartTotalCostView
from .views import CartDeliveryListCreateView,CartDeliveryDetailView, CartDeliveryAdminListCreateView, CartDeliveryOwnerViewListView

urlpatterns = [
    path('equipment/', EquipmentListCreateView.as_view(), name='equipment-list-create'),
    path('equipment/<int:pk>/', EquipmentDetailView.as_view(), name='equipment-detail'),
    path('equipment-bookings/', EquipmentBookingListCreateView.as_view(), name='equipment-booking-list-create'),
    path('equipment-bookings/<int:pk>/', EquipmentBookingUpdateStatusView.as_view(), name='equipment-bookings-update-status'),
    path('equipment-delivery/', EquipmentDeliveryListCreateView.as_view(), name='equipment-delivery-list-create'),
    path('equipment-payments/', EquipmentPaymentView.as_view(), name='equipment-payments-list-create'),
    path('equipment-delivery/<uuid:pk>/', EquipmentDeliveryUpdateView.as_view(), name='equipment-delivery-update'),
    path('equipment-delivery-receive/', EquipmentDeliveryReceiveListView.as_view(), name='equipment-delivery-receive'),
    path('category/', CategoryView.as_view(), name='category-list-view'),
    path('product/', ProductListCreateView.as_view(), name='product-list-create'),
    path('category/', CategoryView.as_view(), name='category-list-view'),
    path('product-user/', ProductOwnerListView.as_view(), name='product-user-list-view'),
    path('product-list/<int:pk>/', ProductListUpdateDeleteView.as_view(), name='product-list-update-delete'),
    
    
    path('cart/', CartListCreateView.as_view(), name='cart-list-create'),
    path('cart/<int:pk>/', CartDetailView.as_view(), name='cart-detail'),
    path('cart/total-cost/', CartTotalCostView.as_view(), name='cart-total-cost'),
    path('cart/payment/', CartPaymentListCreateView.as_view(), name='cart-payment-list-create'),
    
    path('cart-deliveries/', CartDeliveryListCreateView.as_view(), name='cart-delivery-list'),
    
    path('cart-deliveries-admin/', CartDeliveryAdminListCreateView.as_view(), name='cart-deliveries-admin-list'),
    path('cart-deliveries/<int:pk>/', CartDeliveryDetailView.as_view(), name='cart-delivery-detail'),
    path('cart-deliveries/product-owner/', CartDeliveryOwnerViewListView.as_view(), name='cart-delivery-product-owner'),

    
    path('trades/', TradeListCreateView.as_view(), name='trade-list-create'),
    path('trades-all/', TradeAllListView.as_view(), name='trade-all-list-view'),
    path('trade-requests/', TradeRequestListCreateView.as_view(), name='trade-request-list-create'),
    
    path('trade-request-owners/', TradeRequestOwnersListView.as_view(), name='trade-requests-for-owners-list-view'),
    path('trade-request-owners/<int:pk>/', TradeRequestOwnersUpdateView.as_view(), name='trade-request-owners-update'),
    path('trade-Toupdate/<int:pk>/', TradeRetiveUpdateDestroyView.as_view(), name='trade-retive-update-destroy'),
    
    path('confirmed-trades/', ConfirmedTradeListView.as_view(), name='confirmed-trades-list-view'),
    path('confirmed-trades-by-owners/update/<int:pk>/', ConfirmedTradeUpdateByOwnerView.as_view(), name='confirmed-trades-update-by-owner'),
    path('confirmed-trades-by-owners/', ConfirmedTradeListByOwnerView.as_view(), name='confirmed-trades-for-owners-list-view'),
    path('confirmed-trades-by-users/update/<int:pk>/', ConfirmedTradeUpdateByUser.as_view(), name='confirmed-trades-update-by-user'),   
]
