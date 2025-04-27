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


# class EquipmentDeliverySerializerTest(APITestCase):
#     def test_equipment_delivery_serializer(self):
#         print("[Test] Testing Equipment Delivery Serializer...")
#         user = User.objects.create_user(username="deliveryuser", email="delivery@example.com", password="deliverypass")
#         equipment = Equipment.objects.create(
#             user=user,
#             name="Sprayer",
#             per_day_rate=2000,
#             quantity=4,
#             delivery_charge=100,
#             description="Chemical Sprayer",
#             availability_status=True
#         )
        
#         start_date = timezone.now().date()
#         end_date = start_date + timedelta(days=3)
#         booking = EquipmentBooking.objects.create(
#             user=user,
#             equipment=equipment,
#             start_date=start_date,
#             end_date=end_date,
#             status="active",
#             delivery_location="Kathmandu",
#             quantity=2
#         )
#         payment = EquipmentPayment.objects.create(
#             user=user,
#             equipment_booking=booking,
#             amount=6000,
#             status="cleared",
#             payment_method = "esewa"
#         )
#         delivery = EquipmentDelivery.objects.create(
#             equipment_payment=payment,
#             status="delivered"
#         )
#         serializer = EquipmentDeliverySerializer(delivery)

#         print("[Success ✅] Equipment Delivery Data:", serializer.data)
#         print(f"[Details] Delivery Status: {serializer.data['status']}, Payment Amount: {serializer.data['equipment_payment']['amount']}")
#         self.assertEqual(serializer.data['equipment_payment']['user'], "deliveryuser")
        


# class CategorySerializerTest(APITestCase):
#     def test_category_serializer(self):
#         print("[Test] Testing Category Serializer...")
#         category = Category.objects.create(name="Seeds")
#         serializer = CategorySerializer(category)

#         print("[Success ✅] Category Data:", serializer.data)
#         print(f"[Details] Category Name: {serializer.data['name']}")
#         self.assertEqual(serializer.data['name'], "Seeds")


# class ProductSerializerTest(APITestCase):
#     def test_product_serializer(self):
#         print("[Test] Testing Product Serializer...")
#         user = User.objects.create_user(username="productuser", email="product@example.com", password="productpass")
#         category = Category.objects.create(name="Fertilizers")
        # product = Product.objects.create(
        #     user=user,
        #     category=category,
        #     name="Organic Fertilizer",
        #     slug="organic-fertilizer",
        #     product_image="fertilizer.jpg",
        #     quantity=50,
        #     small_description="Small Desc",
        #     description="Full Desc",
        #     original_price=1000,
        #     selling_price=800,
        #     tag="Organic",
        #     delivery_sell_charge=20
        # )
#         serializer = ProductSerializer(product)

#         print("[Success ✅] Product Data:", serializer.data)
#         print(f"[Details] Product Name: {serializer.data['name']}, Category: {serializer.data['category']}, Price: {serializer.data['selling_price']}, Quantity: {serializer.data['quantity']}")
#         self.assertEqual(serializer.data['name'], "Organic Fertilizer")


# class CartSerializerTest(TestCase):
#     def test_cart_serializer(self):
#         user = User.objects.create_user(username='buyer',  password='password')
#         seller = User.objects.create_user(username='seller',  password='password')
#         category = Category.objects.create(name="Fertilizers")
#         product = Product.objects.create(
#             user=seller,
#             category=category,
#             name="Organic Fertilizer",
#             slug="organic-fertilizer",
#             product_image="fertilizer.jpg",
#             quantity=50,
#             small_description="Small Desc",
#             description="Full Desc",
#             original_price=1000,
#             selling_price=800,
#             tag="Organic",
#             delivery_sell_charge=20
#         )
#         cart = Cart.objects.create(user=user, product=product, product_qty=2)
#         serializer = CartSerializer(cart)
#         print("\nCart Serializer Output:", serializer.data)
        
        
# ----------------- Cart Serializer Test -----------------
# class CartSerializerTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="testuser", password="testpass")
        
#         category = Category.objects.create(name="Fertilizers")
#         self.other_user = User.objects.create_user(username="otheruser", password="testpass")
#         self.product = Product.objects.create(
#             name="Test Product", 
#             quantity=10,
#             user=self.other_user,
#             category=category,
#             slug="organic-fertilizer",
#             product_image="fertilizer.jpg",
#             small_description="Small Desc",
#             description="Full Desc",
#             original_price=1000,
#             selling_price=800,
#             tag="Organic",
#             delivery_sell_charge=20
#         )
    
#     def test_create_cart_item(self):
#         print("\n--- Testing CartSerializer Create ---")
#         data = {
#             'product_id': self.product.id,
#             'product_qty': 2,
#             'user' : self.user.id
#         }
#         context = {'request': self._mock_request(self.user)}
#         serializer = CartSerializer(data=data, context=context)
#         print("Input Data:", data)
#         self.assertTrue(serializer.is_valid(), serializer.errors)
#         cart = serializer.save()
#         print("Saved Cart:", cart)
#         print("Cart Product:", cart.product.name)
#         print("Cart User:", cart.user.username)

#     def _mock_request(self, user):
#         """Helper to mock request context."""
#         class MockRequest:
#             def __init__(self, user):
#                 self.user = user
#         return MockRequest(user)
    
from datetime import datetime, timedelta   
# ----------------- Cart Payment Serializer Test -----------------
# class CartPaymentSerializerTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="testuser", password="testpass")
#         self.other_user = User.objects.create_user(username="otheruser", password="testpass")
#         category = Category.objects.create(name="Fertilizers")
        
#         self.product = Product.objects.create(
#             name="Test Product", 
#             quantity=10,
#             user=self.other_user,
#             category=category,
#             slug="organic-fertilizer",
#             product_image="fertilizer.jpg",
#             small_description="Small Desc",
#             description="Full Desc",
#             original_price=1000,
#             selling_price=800,
#             tag="Organic",
#             delivery_sell_charge=20
#         )
#         self.cart = Cart.objects.create(user=self.user, product=self.product, product_qty=2)
#     def test_create_cart_payment(self):
#         print("\n--- Testing CartPaymentSerializer Create ---")
#         data = {
#             'cart': [self.cart.id],
#             'user':self.user,
#             'amount':10000,
#             'status':"pending",
#             'payment_method': "esewa",
#             'delivery_address': 'Kathmandu',
            
#         }
#         context = {'request': self._mock_request(self.user)}
#         serializer = CartPaymentSerializer(data=data, context=context)
#         print("Input Data:", data)
#         self.assertTrue(serializer.is_valid(), serializer.errors)
#         cart_payment = serializer.save()
#         print("Saved CartPayment:", cart_payment)
#         print("Associated Carts:", [c.product.name for c in cart_payment.cart.all()])

#     def _mock_request(self, user):
#         class MockRequest:
#             def __init__(self, user):
#                 self.user = user
#         return MockRequest(user)

# ----------------- Cart Delivery Serializer Test -----------------
class CartDeliverySerializerTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="adminuser", password="testpass")
        self.other_user = User.objects.create_user(username="buyer", password="testpass")
        category = Category.objects.create(name="Fertilizers")    
        self.product = Product.objects.create(
            name="Test Product", 
            quantity=10,
            user=self.user,
            category=category,
            slug="organic-fertilizer",
            product_image="fertilizer.jpg",
            small_description="Small Desc",
            description="Full Desc",
            original_price=1000,
            selling_price=800,
            tag="Organic",
            delivery_sell_charge=20
        )
        self.cart = Cart.objects.create(user=self.other_user, product=self.product, product_qty=1)
        self.cart_payment = CartPayment.objects.create(user=self.other_user, amount=10000, status="pending", payment_method="esewa", delivery_address="Kathmandu")
        self.cart_payment.cart.set([self.cart])
        self.delivery = CartDelivery.objects.create(cart_payment=self.cart_payment)

    def test_update_delivery(self):
        print("\n--- Testing CartDeliverySerializer Update ---")
        data = {
            'status': 'delivered',
            'item_received_by_user': True,
            'delivery_location': 'Test Location',
            'handover_date': datetime.now()
        }
        context = {'request': self._mock_request(self.user)}
        serializer = CartDeliverySerializer(instance=self.delivery, data=data, context=context, partial=True)
        print("Input Data:", data)
        self.assertTrue(serializer.is_valid(), serializer.errors)
        updated_delivery = serializer.save()
        print("Updated Delivery:", updated_delivery.status)
        print("Admin Assigned:", updated_delivery.admin.username)

    def _mock_request(self, user):
        class MockRequest:
            def __init__(self, user):
                self.user = user
        return MockRequest(user)