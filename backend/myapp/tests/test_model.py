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


