from django.test import TestCase
from django.contrib.auth.models import User
from myapp.models import Role, UserRole, FarmerProfile, Equipment, EquipmentBooking, EquipmentPayment, EquipmentDelivery, Product, Category, Cart,Trade, TradeRequest, ConfirmedTrade, CartPayment, CartDelivery
from datetime import date, timedelta
from decimal import Decimal
import uuid







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
