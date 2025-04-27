from django.test import TestCase
from django.contrib.auth.models import User
from myapp.models import Role, UserRole, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Product, Category, Cart,Trade, TradeRequest, ConfirmedTrade, CartPayment, CartDelivery
from datetime import date, timedelta
from decimal import Decimal
import uuid
from django.utils import timezone
from django.contrib.auth import get_user_model

from myapp.serializers import DashboardSliderSerializer, LoginSerializer, RegisterSerializer, RoleSerializer, UserRoleSerializer, UserSerializer, ProductSerializer, CategorySerializer, CartSerializer, CartPaymentSerializer, CartDeliverySerializer, TradeSerializer, TradeRequestSerializer, ConfirmedTradeSerializer, EquipmentSerializer, EquipmentBookingSerializer, EquipmentPaymentSerializer, EquipmentDeliverySerializer
from rest_framework.test import APITestCase


# class RoleSerializerTest(APITestCase):
#     def test_role_serializer(self):
#         role = Role.objects.create(name="farmer")
#         serializer = RoleSerializer(role)
#         print("Serialized Role Data:", serializer.data)
#         self.assertEqual(serializer.data['name'], "farmer")
        
        
# class RegisterSerializerTest(APITestCase):
#     def test_register_serializer(self):
#         print("[Test] Testing Register Serializer...")
#         role = Role.objects.create(name="farmer")
#         data = {
#             "username": "newuser",
#             "email": "newuser@example.com",
#             "password": "newpass123",
#             "role": "farmer",
#             "farm_location": "Kathmandu",
#             "occupation_name": "Vegetable Farming"
#         }
#         serializer = RegisterSerializer(data=data)
#         self.assertTrue(serializer.is_valid(), serializer.errors)
#         user = serializer.save()
#         print("[Success ✅] New Registered User:", user.username, user.email)


# class LoginSerializerTest(APITestCase):
#     def test_login_serializer(self):
#         print("[Test] Testing Login Serializer...")
#         data = {
#             "username": "someuser",
#             "password": "somepassword"
#         }
#         serializer = LoginSerializer(data=data)
#         self.assertTrue(serializer.is_valid(), serializer.errors)
#         print("[Success ✅] Login Data:", serializer.validated_data)





# class EquipmentSerializerTest(APITestCase):
#     def test_equipment_serializer(self):
#         print("[Test] Testing Equipment Serializer...")
#         user = User.objects.create_user(username="equipuser", email="equip@example.com", password="equipass")
#         equipment = Equipment.objects.create(
#             user=user,
#             name="Tractor",
#             per_day_rate=5000,
#             quantity=3,
#             delivery_charge=200,
#             description="Good Tractor",
#             availability_status=True
#         )
#         serializer = EquipmentSerializer(equipment)
#         print("[Success ✅] Equipment Data:", serializer.data)
#         self.assertEqual(serializer.data['name'], "Tractor")



# class EquipmentBookingSerializerTest(APITestCase):
#     def test_equipment_booking_serializer(self):
#         print("[Test] Testing Equipment Booking Serializer...")
#         user = User.objects.create_user(username="bookinguser", email="booking@example.com", password="bookingpass")
#         equipment = Equipment.objects.create(
#             user=user,
#             name="Harvester",
#             per_day_rate=8000,
#             quantity=2,
#             delivery_charge=300,
#             description="Big Harvester",
#             availability_status=True
#         )
#         start_date = timezone.now().date()
#         end_date = start_date + timedelta(days=2)
#         booking = EquipmentBooking.objects.create(
#             user=user,
#             equipment=equipment,
#             start_date=start_date,
#             end_date=end_date,
#             status="pending",
#             delivery_location="Kathmandu",
#             quantity=2
#         )
#         serializer = EquipmentBookingSerializer(booking)

#         print("[Success ✅] Equipment Booking Data:", serializer.data)
#         print(f"[Details] User: {serializer.data['user']}, Equipment: {serializer.data['equipment']}, Status: {serializer.data['status']}")
#         self.assertEqual(serializer.data['user'], "bookinguser")


# class EquipmentPaymentSerializerTest(APITestCase):
#     def test_equipment_payment_serializer(self):
#         print("[Test] Testing Equipment Payment Serializer...")
#         user = User.objects.create_user(username="paymentuser", email="payment@example.com", password="paymentpass")
#         equipment = Equipment.objects.create(
#             user=user,
#             name="Plough",
#             per_day_rate=3000,
#             quantity=5,
#             delivery_charge=150,
#             description="Heavy Plough",
#             availability_status="available"
#         )
#         start_date = timezone.now().date()
#         end_date = start_date + timedelta(days=1)
#         booking = EquipmentBooking.objects.create(
#             user=user,
#             equipment=equipment,
#             start_date=start_date,
#             end_date=end_date,
#             status="active"
#         )
#         payment = EquipmentPayment.objects.create(
#             user=user,
#             equipment_booking=booking,
#             amount=10000,
#             status="pending"
#         )
#         serializer = EquipmentPaymentSerializer(payment)

#         print("[Success ✅] Equipment Payment Data:", serializer.data)
#         print(f"[Details] User: {serializer.data['user']}, Amount: {serializer.data['amount']}, Status: {serializer.data['status']}")
#         self.assertEqual(serializer.data['user'], "paymentuser")


class EquipmentDeliverySerializerTest(APITestCase):
    def test_equipment_delivery_serializer(self):
        print("[Test] Testing Equipment Delivery Serializer...")
        user = User.objects.create_user(username="deliveryuser", email="delivery@example.com", password="deliverypass")
        equipment = Equipment.objects.create(
            user=user,
            name="Sprayer",
            per_day_rate=2000,
            quantity=4,
            delivery_charge=100,
            description="Chemical Sprayer",
            availability_status=True
        )
        
        start_date = timezone.now().date()
        end_date = start_date + timedelta(days=3)
        booking = EquipmentBooking.objects.create(
            user=user,
            equipment=equipment,
            start_date=start_date,
            end_date=end_date,
            status="active",
            delivery_location="Kathmandu",
            quantity=2
        )
        payment = EquipmentPayment.objects.create(
            user=user,
            equipment_booking=booking,
            amount=6000,
            status="cleared",
            payment_method = "esewa"
        )
        delivery = EquipmentDelivery.objects.create(
            equipment_payment=payment,
            status="delivered"
        )
        serializer = EquipmentDeliverySerializer(delivery)

        print("[Success ✅] Equipment Delivery Data:", serializer.data)
        print(f"[Details] Delivery Status: {serializer.data['status']}, Payment Amount: {serializer.data['equipment_payment']['amount']}")
        self.assertEqual(serializer.data['equipment_payment']['user'], "deliveryuser")
        
