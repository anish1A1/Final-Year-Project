from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.contrib.auth import get_user_model
from django.urls import reverse
from myapp.serializers import LoginSerializer, RegisterSerializer, RoleSerializer, UserRoleSerializer, UserSerializer, ProductSerializer, CategorySerializer, CartSerializer, CartPaymentSerializer, CartDeliverySerializer, TradeSerializer, TradeRequestSerializer, ConfirmedTradeSerializer, EquipmentSerializer, EquipmentBookingSerializer, EquipmentPaymentSerializer, EquipmentDeliverySerializer

from myapp.models import Role, UserRole, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Product, Category, Cart,Trade, TradeRequest, ConfirmedTrade, CartPayment, CartDelivery
from django.contrib.auth.models import User
from unittest.mock import patch

User = get_user_model()
# class RegisterViewTest(APITestCase):
#     def test_register_user(self):
#         print("[Test] Registering a new user...")
#         url = reverse('auth_register')  
#         self.role = Role.objects.create(name="user")
#         data = {
#             "username": "testuser",
#             "email": "testuser@example.com",
#             "password": "TestPass123",
#             'role': self.role,
#         }
#         response = self.client.post(url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertTrue(User.objects.filter(username="testuser").exists())
#         print("[Success ✅] User 'testuser' successfully registered!\n")


# class LoginViewTest(APITestCase):
#     def setUp(self):
#         print("[Setup] Creating a user for login test...")
        
#         self.user = User.objects.create_user(username="testuser", password="TestPass123")
    
#     def test_login_user_success(self):
#         print("[Test] Logging in with valid credentials...")
#         url = reverse('auth_login')  
#         data = {
#             "username": "testuser",
#             "password": "TestPass123"
#         }
#         response = self.client.post(url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('access', response.data)
#         self.assertIn('refresh', response.data)
#         print("[Success ✅] Login successful! Access and refresh tokens received.\n")
    
#     def test_login_user_invalid_credentials(self):
#         print("[Test] Attempting login with invalid credentials...")
#         url = reverse('auth_login')
#         data = {
#             "username": "testuser",
#             "password": "WrongPassword"
#         }
#         response = self.client.post(url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)
#         print("[Success ✅] Login failed with incorrect password as expected.\n")


# class CreateProductChatTest(APITestCase):
#     def setUp(self):
#         print("[Setup] Creating users and product for chat test...")
#         self.sender = User.objects.create_user(username="sender", password="TestPass123")
#         self.receiver = User.objects.create_user(username="receiver", password="TestPass123")
#         category = Category.objects.create(name="Fertilizers")
#         self.product = Product.objects.create(user=self.receiver, name="Test Product",
#             category=category,
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
#         self.client = APIClient()
    
#     def test_create_product_chat_success(self):
#         print("[Test] Creating a product chat with another user...")
#         self.client.force_authenticate(user=self.sender)
#         url = reverse('create_product_chat', args=[self.product.id])  
#         response = self.client.post(url)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('channel_id', response.data)
#         print("[Success ✅] Chat successfully created! Channel ID received.\n")
    
#     def test_create_product_chat_self_chat(self):
#         print("[Test] Attempting to start a chat with oneself...")
#         self.client.force_authenticate(user=self.receiver)
#         url = reverse('create_product_chat', args=[self.product.id])
#         response = self.client.post(url)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         print("[Success ✅] Self-chat correctly rejected.\n")


# class GenerateTradeSummaryTests(APITestCase):
#     def setUp(self):
#         print("[Setup] Initializing Trade Summary Test...")
#         self.client = APIClient()
#         self.user = User.objects.create_user(username="testuser", password="testpass123")
#         self.client.force_authenticate(user=self.user)
#         self.url = reverse('trade-summary')  

#     @patch('myapp.views.get_trade_insight')  # Mocking the function
#     def test_generate_trade_summary_success(self, mock_get_trade_insight):
#         print("[Test] Generating trade summary with valid input...")
#         mock_get_trade_insight.return_value = "Summary text"
#         response = self.client.post(self.url, {'trade_text': 'I want to trade 200 bananas with 40 pieces of apple in return'})

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertIn('summary', response.data)
#         print("[Success ✅] Trade summary generated successfully!\n")

#     def test_generate_trade_summary_without_text(self):
#         print("[Test] Attempting to generate trade summary without text input...")
#         response = self.client.post(self.url, {})

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         print("[Success ✅] Expected failure due to missing trade text.\n")


# class EquipmentListCreateTests(APITestCase):
#     def setUp(self):
#         print("[Setup] Initializing Equipment List & Create Tests...")
#         self.client = APIClient()
#         self.user = User.objects.create_user(username="testuser", password="testpass123")
#         self.client.force_authenticate(user=self.user)
#         self.url = reverse('equipment-list-create')  # Ensure correct URL name

#     def test_list_equipment_unauthenticated(self):
#         print("[Test] Fetching equipment list without authentication...")
#         self.client.logout()
#         response = self.client.get(self.url)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         print("[Success ✅] Equipment list fetched successfully (unauthenticated).\n")

#     def test_create_equipment_authenticated(self):
#         print("[Test] Creating new equipment with authenticated user...")
#         data = {
#             'name': 'Tractor',
#             'description': 'Heavy duty tractor',
#             'per_day_rate': 5000,
#             'user':self.user,
#             'quantity':3,
#              'delivery_charge':200,
#              'availability_status':True
#         }
#         response = self.client.post(self.url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         print("[Success ✅] Equipment created successfully!\n")


# class EquipmentPartialUpdateTests(APITestCase):
#     def setUp(self):
#         print("[Setup] Initializing Equipment Update Tests...")
#         self.client = APIClient()
#         self.owner = User.objects.create_user(username="owner", password="testpass123")
#         self.other_user = User.objects.create_user(username="other", password="testpass123")
#         self.equipment = Equipment.objects.create(name="Tractor", user=self.owner, per_day_rate=5000, quantity=3, delivery_charge=200, availability_status=True)
#         self.url = reverse('equipment-partial-update', kwargs={'pk': self.equipment.id})  

#     def test_partial_update_by_owner(self):
#         print("[Test] Updating equipment price by owner...")
#         self.client.force_authenticate(user=self.owner)
#         response = self.client.patch(self.url, {'per_day_rate': 6000})

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.equipment.refresh_from_db()
#         self.assertEqual(self.equipment.per_day_rate, 6000)
#         print("[Success ✅] Owner successfully updated equipment price!\n")

#     def test_partial_update_by_other_user(self):
#         print("[Test] Attempting update by unauthorized user...")
#         self.client.force_authenticate(user=self.other_user)
#         response = self.client.patch(self.url, {'per_day_rate': 6000})

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
#         print("[Success ✅] Unauthorized update correctly rejected.\n")



# class EquipmentBookingListCreateTests(APITestCase):
#     def setUp(self):
#         print("[Setup] Initializing Equipment Booking Tests...")
#         self.client = APIClient()
#         self.user = User.objects.create_user(username="booker", password="testpass123")
#         self.owner = User.objects.create_user(username="owner", password="testpass123")
#         self.equipment = Equipment.objects.create(name="Plough", user=self.owner, per_day_rate=5000, quantity=3, delivery_charge=200, availability_status=True)
#         self.client.force_authenticate(user=self.user)
#         self.url = reverse('equipment-booking-list-create')  

#     def test_create_equipment_booking(self):
#         print("[Test] Creating an equipment booking...")
#         data = {
#             'equipment': self.equipment.id,
#             'start_date': '2025-05-01',
#             'end_date': '2025-05-05',
#             'status':"pending",
#             'delivery_location':"Kathmandu",
#             'quantity':2
#         }
#         response = self.client.post(self.url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         print("[Success ✅] Equipment booking created successfully!\n")


# class EquipmentPaymentTests(APITestCase):
#     def setUp(self):
#         print("[Setup] Initializing Equipment Payment Tests...")
#         self.client = APIClient()
#         self.user = User.objects.create_user(username="payer", password="testpass123")
#         self.owner = User.objects.create_user(username="owner", password="testpass123")
#         self.equipment = Equipment.objects.create(name="Seeder", user=self.owner, per_day_rate=5000, quantity=3, delivery_charge=200, availability_status=True)
#         self.booking = EquipmentBooking.objects.create(equipment=self.equipment, user=self.user, start_date="2025-05-01", end_date="2025-05-03", status="active", delivery_location="Kathmandu", quantity=2)
#         self.client.force_authenticate(user=self.user)
#         self.url = reverse('equipment-payments-list-create')

#     def test_create_equipment_payment(self):
#         print("[Test] Creating a payment for equipment booking...")
#         data = {
#             'equipment_booking': self.booking.id,
#             'amount': 3000,
#             'user':self.user,
#             'status':"pending",
#             'payment_method':"esewa"
#         }
#         response = self.client.post(self.url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         print("[Success ✅] Equipment payment created successfully!\n")

#     def test_create_payment_invalid_booking(self):
#         print("[Test] Attempting to create a payment with an invalid booking ID...")
#         data = {
#             'equipment_booking': 999,
#             'amount': 3000,
#             'user':self.user,
#             'status':"pending",
#             'payment_method':"esewa"
            
#         }
#         response = self.client.post(self.url, data)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
#         print("[Success ✅] Payment creation failed as expected due to invalid booking.\n")


# class EquipmentDeliveryListCreateTests(APITestCase):
#     def setUp(self):
#         print("[Setup] Initializing Equipment Delivery Tests...")
#         self.client = APIClient()
#         self.user = User.objects.create_user(username="deliver", password="testpass123")
#         self.owner = User.objects.create_user(username="owner", password="testpass123")
#         self.equipment = Equipment.objects.create(name="Harvester", user=self.owner, per_day_rate=5000, quantity=3, delivery_charge=200, availability_status=True)
#         self.booking = EquipmentBooking.objects.create(equipment=self.equipment, user=self.user, start_date="2025-05-01", end_date="2025-05-05")
#         self.payment = EquipmentPayment.objects.create(user=self.user, equipment_booking=self.booking, amount=4000)
#         self.delivery = EquipmentDelivery.objects.create(equipment_payment=self.payment)
#         self.client.force_authenticate(user=self.owner)
#         self.url = reverse('equipment-delivery-list-create')

#     def test_list_deliveries(self):
#         print("[Test] Fetching equipment deliveries list...")
#         response = self.client.get(self.url)

#         print("[Response] Status Code:", response.status_code)
#         print("[Response] Data:", response.data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         print("[Success ✅] Equipment deliveries list fetched successfully!\n")

