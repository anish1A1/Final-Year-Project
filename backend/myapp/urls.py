from django.urls import path
from .views import EquipmentListCreateView, EquipmentDetailView, EquipmentStockListCreateView, EquipmentStockDetailView

urlpatterns = [
    path('equipment/', EquipmentListCreateView.as_view(), name='equipment-list-create'),
    path('equipment/<int:pk>/', EquipmentDetailView.as_view(), name='equipment-detail'),
    path('equipment-stock', EquipmentStockListCreateView.as_view(), name='equipment-stock-list-create'),
    path('equipment-stock/<int:pk>/', EquipmentStockDetailView.as_view(), name='equipment-stock-detail'),
]
