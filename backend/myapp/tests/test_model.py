from django.test import TestCase
from django.contrib.auth.models import User
from myapp.models import Role, UserRole, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Product, Category, Cart,Trade, TradeRequest, ConfirmedTrade, CartPayment, CartDelivery
from datetime import date, timedelta
from decimal import Decimal
import uuid
from django.utils import timezone
from django.contrib.auth import get_user_model





# class RoleModelTest(TestCase):
#     def setUp(self):
#         self.role = Role.objects.create(name='farmer')

#     def test_role_creation(self):
#         self.assertEqual(self.role.name, 'farmer')
#     def test_role_str(self):
#         self.assertEqual(str(self.role), 'farmer')
        
        
# class UserRoleModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.role = Role.objects.create(name="user")
#         self.user_role = UserRole.objects.create(user=self.user, role=self.role)
#         print(f"\n[Setup] UserRole Created: {self.user.username} - {self.role.name}")

#     def test_user_role_creation(self):
#         print("[Test] Testing UserRole Creation...")
#         self.assertEqual(self.user_role.user.username, "anish")
#         self.assertEqual(self.user_role.role.name, "user")
#         print("[Success ✅] UserRole is correct:", self.user_role.user.username, self.user_role.role.name)

#     def test_is_user(self):
#         print("[Test] Checking is_user Method...")
#         self.assertTrue(self.user_role.is_user())
#         print("[Success ✅] is_user() returned True")



# class FarmerProfileModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="farmer1", password="password123")
#         self.role = Role.objects.create(name="farmer")
#         self.user_role = UserRole.objects.create(user=self.user, role=self.role)
#         self.farmer_profile = FarmerProfile.objects.create(
#             user_role=self.user_role,
#             farm_location="Kathmandu",
#             occupation_name="Vegetable Farming"
#         )

#     def test_farmer_profile_creation(self):
#         self.assertEqual(self.farmer_profile.farm_location, "Kathmandu")
#         self.assertEqual(self.farmer_profile.occupation_name, "Vegetable Farming")

#     def test_farmer_profile_str(self):
#         self.assertEqual(str(self.farmer_profile), "farmer1's Farmer Profile")




# class EquipmentModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.equipment = Equipment.objects.create(
#             name="Tractor",
#             description="Heavy duty tractor",
#             per_day_rate=Decimal('1500.00'),
#             user=self.user,
#             delivery_charge=Decimal('500.00'),
#             quantity=5,
#             availability_status=True
#         )
#         print("\n[Setup] Equipment Created:", self.equipment.name)

#     def test_equipment_creation(self):
#         print("[Test] Testing Equipment Creation...")
#         self.assertEqual(self.equipment.name, "Tractor")
#         print("[Success ✅] Equipment name:", self.equipment.name)

#     def test_equipment_str(self):
#         print("[Test] Testing Equipment __str__...")
#         self.assertEqual(str(self.equipment), "Tractor")
#         print("[Success ✅] Equipment __str__ output:", str(self.equipment))


# class EquipmentBookingModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.equipment = Equipment.objects.create(
#             name="Tractor",
#             description="Heavy duty tractor",
#             per_day_rate=Decimal('1500.00'),
#             user=self.user,
#             delivery_charge=Decimal('500.00'),
#             quantity=5
#         )
#         self.booking = EquipmentBooking.objects.create(
#             start_date=date.today(),
#             end_date=date.today() + timedelta(days=2),
#             delivery_location="Kathmandu",
#             quantity=2,
#             user=self.user,
#             equipment=self.equipment
#         )
#         print("\n[Setup] EquipmentBooking Created for:", self.user.username)

#     def test_total_date(self):
#         print("[Test] Testing total_date property...")
#         self.assertEqual(self.booking.total_date, 2)
#         print("[Success ✅] total_date is:", self.booking.total_date)

#     def test_total_cost(self):
#         print("[Test] Testing total_cost property...")
#         expected_cost = 2 * Decimal('1500.00') * 2  # quantity * per_day_rate * total_date
#         self.assertEqual(self.booking.total_cost, expected_cost)
#         print("[Success ✅] total_cost is:", self.booking.total_cost)

#     def test_booking_str(self):
#         print("[Test] Testing EquipmentBooking __str__...")
#         self.assertEqual(str(self.booking), str(self.booking.id))
#         print("[Success ✅] EquipmentBooking __str__ output:", str(self.booking))


# class EquipmentPaymentModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.equipment = Equipment.objects.create(
#             name="Tractor",
#             description="Heavy duty tractor",
#             per_day_rate=Decimal('1500.00'),
#             user=self.user,
#             delivery_charge=Decimal('500.00'),
#             quantity=5
#         )
#         self.booking = EquipmentBooking.objects.create(
#             start_date=date.today(),
#             end_date=date.today() + timedelta(days=2),
#             delivery_location="Kathmandu",
#             quantity=2,
#             user=self.user,
#             equipment=self.equipment
#         )
#         self.payment = EquipmentPayment.objects.create(
#             user=self.user,
#             equipment_booking=self.booking,
#             payment_method='esewa',
#             amount=Decimal('6000.00')
#         )
#         print("\n[Setup] EquipmentPayment Created with ID:", self.payment.id)

#     def test_payment_status_and_type(self):
#         print("[Test] Testing EquipmentPayment auto status and type...")
#         self.assertEqual(self.payment.status, EquipmentPayment.PaymentStatusChoices.CLEARED)
#         self.assertEqual(self.payment.payment_type, EquipmentPayment.PaymentTypeChoices.ONLINE)
#         print("[Success ✅] Payment status:", self.payment.status, "Payment type:", self.payment.payment_type)

#     def test_payment_str(self):
#         print("[Test] Testing EquipmentPayment __str__...")
#         expected_output = f"Payment of {self.payment.amount} for {self.payment.equipment_booking} ({self.payment.payment_type} by {self.payment.user}) id {self.payment.id}"
#         self.assertEqual(str(self.payment), expected_output)
#         print("[Success ✅] EquipmentPayment __str__ output:", str(self.payment))



# class EquipmentDeliveryModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.equipment = Equipment.objects.create(
#             name="Tractor",
#             description="Heavy duty tractor",
#             per_day_rate=Decimal('1500.00'),
#             user=self.user,
#             delivery_charge=Decimal('500.00'),
#             quantity=5
#         )
#         self.booking = EquipmentBooking.objects.create(
#             start_date=date.today(),
#             end_date=date.today() + timedelta(days=2),
#             delivery_location="Kathmandu",
#             quantity=2,
#             user=self.user,
#             equipment=self.equipment
#         )
#         self.payment = EquipmentPayment.objects.create(
#             user=self.user,
#             equipment_booking=self.booking,
#             payment_method='esewa',
#             amount=Decimal('6000.00')
#         )
#         self.delivery = EquipmentDelivery.objects.create(
#             equipment_payment=self.payment
#         )
#         print("\n[Setup] EquipmentDelivery Created for Payment ID:", self.payment.id)

#     def test_delivery_status_default(self):
#         print("[Test] Testing Delivery Default Status...")
#         self.assertEqual(self.delivery.status, EquipmentDelivery.DeliveryStatusChoices.PROCESSING)
#         print("[Success ✅] Delivery status:", self.delivery.status)

#     def test_delivery_str(self):
#         print("[Test] Testing EquipmentDelivery __str__...")
#         expected_output = f"Delivery for Payment ID: {self.payment.id}, Status: {self.delivery.status}"
#         self.assertEqual(str(self.delivery), expected_output)
#         print("[Success ✅] EquipmentDelivery __str__ output:", str(self.delivery))



# class ProductModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.category = Category.objects.create(
#             slug="Nuts",
#             name="Nuts",
#             description="A healthy food source",
#         )
#         self.product = Product.objects.create(
#             category=self.category,
#             user=self.user,
#             slug="Cashew",
#             name="Cashew",
#             small_description="Small Desc",
#             quantity=5,
#             description="Full Desc",
#             original_price=Decimal('100.00'),
#             selling_price=Decimal('80.00'),
#             tag="Nuts",
#         )
#         print("\n[Setup] Product Created:", self.product.name)

#     def test_product_str(self):
#         print("[Test] Testing Product __str__...")
#         self.assertEqual(str(self.product), "Cashew")
#         print("[Success ✅] Product __str__ output:", str(self.product))

#     def test_product_total_amount(self):
#         print("[Test] Testing product_total_amount method...")
#         expected_total = Decimal('80.00') * 5
#         self.assertEqual(self.product.product_total_amount(), expected_total)
#         print("[Success ✅] product_total_amount:", expected_total)


# class CartModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="anish", password="password123")
#         self.category = Category.objects.create(
#             slug="tractor",
#             name="Tractor",
#             description="Heavy duty tractors"
#         )
#         self.product = Product.objects.create(
#             category=self.category,
#             user=self.user,
#             slug="tractor-x",
#             name="Tractor X",
#             small_description="Small Desc",
#             quantity=5,
#             description="Full Desc",
#             original_price=Decimal('10000.00'),
#             selling_price=Decimal('8000.00'),
#             tag="farming",
#         )
#         self.cart = Cart.objects.create(
#             user=self.user,
#             product=self.product,
#             product_qty=2
#         )
#         print("\n[Setup] Cart Created for product:", self.product.name)

#     def test_cart_total_cost(self):
#         print("[Test] Testing Cart total_cost...")
#         expected_total = Decimal('8000.00') * 2
#         self.assertEqual(self.cart.total_cost, expected_total)
#         print("[Success ✅] Cart total_cost:", expected_total)

#     def test_cart_str(self):
#         print("[Test] Testing Cart __str__...")
#         expected_output = f"{self.product.name} Ordered by {self.user.username}"
#         self.assertEqual(str(self.cart), expected_output)
#         print("[Success ✅] Cart __str__ output:", expected_output)




User = get_user_model()
# class TradeModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="trader", password="password123")
#         self.category = Category.objects.create(
#             slug="tractor",
#             name="Tractor",
#             description="Heavy duty tractors"
#         )
#         self.product = Product.objects.create(
#             user=self.user,
#             category_id=self.category.id,
#             slug="test-slug",
#             name="Test Product",
#             small_description="Small desc",
#             quantity=10,
#             description="Test description",
#             original_price=500,
#             selling_price=400,
#             tag="test",
#         )
#         self.trade = Trade.objects.create(
#             product=self.product,
#             user=self.user,
#             trading_quantity=5,
#             wanted_product="Tomato",
#             wanted_quantity=5,
#             note="Looking for fresh tomatoes",
#             trade_ending_date=timezone.now() + timezone.timedelta(days=5),
#         )
#         print("\n[Setup] Trade Created: Trade of", self.product.name, "offered by", self.user.username)

#     def test_trade_str(self):
#         print("[Test] Testing Trade __str__...")
#         result = str(self.trade)
#         self.assertEqual(result, f"Trade of {self.product.name} offered by {self.user.username}")
#         print("[Success ✅] Trade __str__ output:", result)

#     def test_trade_status_active(self):
#         print("[Test] Checking Trade Status...")
#         status = self.trade.trade_status
#         self.assertEqual(status, "Trade active")
#         print("[Success ✅] Trade Status:", status)

#     def test_trade_time_left(self):
#         print("[Test] Checking Time Left for Trade...")
#         time_left = self.trade.time_left()
#         self.assertGreaterEqual(time_left, 4)
#         print("[Success ✅] Time left for Trade:", time_left, "days")


# class TradeRequestModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="requester", password="password123")
#         self.trade_owner = User.objects.create_user(username="owner", password="password456")
#         self.category = Category.objects.create(
#             slug="tractor",
#             name="Tractor",
#             description="Heavy duty tractors"
#         )
#         self.product = Product.objects.create(
#             user=self.trade_owner,
#             category_id=self.category.id,
#             slug="owner-slug",
#             name="Owner Product",
#             small_description="Small desc",
#             quantity=5,
#             description="Owner description",
#             original_price=300,
#             selling_price=250,
#             tag="owner",
#         )
#         self.trade = Trade.objects.create(
#             product=self.product,
#             user=self.trade_owner,
#             trading_quantity=2,
#             wanted_product="Onion",
#             wanted_quantity=3,
#             note="Need onions",
#             trade_ending_date=timezone.now() + timezone.timedelta(days=2),
#         )
#         self.trade_request = TradeRequest.objects.create(
#             trade=self.trade,
#             user=self.user,
#             delivery_location="Kathmandu",
#             product_name="My Onion",
#             note="Here are fresh onions"
#         )
#         print("\n[Setup] Trade Request Created:", self.trade_request.product_name, "for trade involving", self.trade.product.name)

#     def test_trade_request_str(self):
#         print("[Test] Testing Trade Request __str__...")
#         result = str(self.trade_request)
#         expected = f"{self.trade_request.user.username} wants to trade {self.trade_request.product_name} for {self.trade_request.trade.product.name}"
#         self.assertEqual(result, expected)
#         print("[Success ✅] Trade Request __str__ output:", result)

#     def test_default_status_pending(self):
#         print("[Test] Checking Default Trade Request Status...")
#         status = self.trade_request.status
#         self.assertEqual(status, TradeRequest.StatusChoices.PENDING)
#         print("[Success ✅] Trade Request Status:", status)


# class ConfirmedTradeModelTest(TestCase):
#     def setUp(self):
#         self.user = User.objects.create_user(username="confirm_user", password="password123")
#         self.trade_owner = User.objects.create_user(username="trade_owner", password="password456")
#         self.category = Category.objects.create(
#             slug="tractor",
#             name="Tractor",
#             description="Heavy duty tractors"
#         )
#         self.product = Product.objects.create(
#             user=self.trade_owner,
#             category_id=self.category.id,
#             slug="confirm-slug",
#             name="Confirm Product",
#             small_description="Confirm desc",
#             quantity=5,
#             description="Confirm description",
#             original_price=600,
#             selling_price=550,
#             tag="confirm",
#         )
#         self.trade = Trade.objects.create(
#             product=self.product,
#             user=self.trade_owner,
#             trading_quantity=3,
#             wanted_product="Potato",
#             wanted_quantity=4,
#             note="Need fresh potatoes",
#             trade_ending_date=timezone.now() + timezone.timedelta(days=1),
#         )
#         self.trade_request = TradeRequest.objects.create(
#             trade=self.trade,
#             user=self.user,
#             delivery_location="Bhaktapur",
#             product_name="My Potato",
#             note="Fresh potatoes for trade"
#         )
#         self.confirmed_trade = ConfirmedTrade.objects.create(
#             trade_request=self.trade_request,
#             item_location="Warehouse A"
#         )

#         print("\n[Setup] Confirmed Trade Created:", 
#               f"Trade between {self.trade_request.user.username} and {self.trade_request.trade.user.username}")

#     def test_confirmed_trade_str(self):
#         print("[Test] Testing Confirmed Trade __str__...")
#         result = str(self.confirmed_trade)
#         expected = f"Trade between {self.trade_request.user.username} and {self.trade_request.trade.user.username}"
#         self.assertEqual(result, expected)
#         print("[Success ✅] Confirmed Trade __str__ output:", result)

#     def test_default_delivery_status(self):
#         print("[Test] Checking Default Delivery Status...")
#         status = self.confirmed_trade.status
#         self.assertEqual(status, ConfirmedTrade.DeliveryStatusChoices.PROCESSING)
#         print("[Success ✅] Default Delivery Status:", status)

#     def test_item_not_received_initially(self):
#         print("[Test] Checking Initial Item Received Status...")
#         received = self.confirmed_trade.item_received
#         self.assertFalse(received)
#         print("[Success ✅] Item Received Initially:", received)   