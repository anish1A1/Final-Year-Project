from collections import defaultdict
import datetime
from django.db import models
from django.contrib.auth.models import User
import os
from decimal import Decimal
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
import uuid
from django.utils import timezone
def validate_file_size(value):
    filesize = value.size
    if filesize > 10485760:  # 10 MB limit
        raise ValidationError("Maximum file size is 10MB")


class Role(models.Model):
    name = models.CharField(max_length=100, unique=True)
    def __str__(self):
        return self.name
    
class UserRole(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_roles')
    role = models.ForeignKey(Role, on_delete=models.CASCADE)
    
    class Meta:
        unique_together = ('user', 'role')
        
        # the unique_together option is used to enforce a unique constraint on the combination 
        # of the user and role fields. 
        # This means that each pair of user and role must be unique in the UserRole table.
        
    def __str__(self):
        return self.user.username + ' ' + self.role.name    
        
        
class FarmerProfile(models.Model):
    user_role = models.OneToOneField(UserRole, on_delete=models.CASCADE, related_name='Farmer_Profile')
    farm_location = models.CharField(max_length=255)
    occupation_name = models.CharField(max_length=255)
    
    def __str__(self):
        return f"{self.user_role.user.username}'s Farmer Profile"
    

class Equipment(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    image = models.ImageField(upload_to='uploads/images', null=True,blank=True, validators=[validate_file_size, FileExtensionValidator(['jpg', 'png'])])
    # availability_status = models.BooleanField(default=True)
    # quantity = models.IntegerField()
    per_day_rate = models.DecimalField(max_digits=10, decimal_places=2)
    user_manual = models.FileField(upload_to='uploads/manuals', null=True, blank=True, validators=[validate_file_size, FileExtensionValidator(['pdf', 'docx'])])
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='equipment')
    delivery_charge = models.DecimalField(max_digits=10, decimal_places=2)
    quantity = models.IntegerField()
    availability_status = models.BooleanField(default=True)

    def __str__(self):
        return self.name 
    

class EquipmentBooking(models.Model):
    
    class StatusChoices(models.TextChoices):
        PENDING = 'pending'
        ACCEPTED = 'accepted'
        REJECTED = 'rejected'
    
    start_date = models.DateField()
    end_date = models.DateField()
    date_added = models.DateField(auto_now_add=True)
    delivery_location = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='equipment_booking')
    equipment = models.ForeignKey(Equipment, on_delete=models.CASCADE, related_name='equipment_booking')
    status = models.CharField(max_length=255, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    
    @property
    def total_date(self):
        return (self.end_date - self.start_date).days
    @property
    def total_cost(self):
        return self.quantity * self.equipment.per_day_rate * self.total_date
    
    def __str__(self):
        return str(self.id)
    # def __str__(self):
    #     return f"Booking for {self.equipment.name} from {self.start_date} to {self.end_date}"
    
 

class CommonPayments(models.Model):
    class PaymentTypeChoices(models.TextChoices):
        ONLINE = 'online', 'Online'
        OFFLINE = 'offline', 'Offline'
    
    class PaymentStatusChoices(models.TextChoices):
        PENDING = 'pending'
        CLEARED = 'cleared'
    
    class PaymentMethodChoices(models.TextChoices):
        ESEWA = 'esewa'
        CASH = 'cash'
        KHALTI = 'khalti'
        
    payment_method = models.CharField(max_length=50, choices=PaymentMethodChoices.choices)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date_paid = models.DateField(auto_now_add=True)
    payment_type = models.CharField(max_length=50, choices=PaymentTypeChoices.choices, default=PaymentTypeChoices.OFFLINE)
    status = models.CharField(max_length=50, choices=PaymentStatusChoices.choices, default= PaymentStatusChoices.PENDING)

    class Meta:
        abstract = True
        
class EquipmentPayment(CommonPayments):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='payments')
    equipment_booking = models.ForeignKey(EquipmentBooking, on_delete=models.CASCADE, related_name='payments')
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
  
    def __str__(self):
        return f"Payment of {self.amount} for {self.equipment_booking} ({self.payment_type} by {self.user}) id {self.id}"

    def save(self, *args, **kwargs):
     
        if self.payment_method in [self.PaymentMethodChoices.ESEWA, self.PaymentMethodChoices.KHALTI]:
            self.status = self.PaymentStatusChoices.CLEARED
            self.payment_type = self.PaymentTypeChoices.ONLINE
        super().save(*args, **kwargs)
    

   

class EquipmentDelivery(models.Model):
    class DeliveryStatusChoices(models.TextChoices):
        PROCESSING = 'processing', 'Processing'
        DELIVERING = 'delivering', 'Delivering'
        DELIVERED = 'delivered', 'Delivered'
    

    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    equipment_payment = models.OneToOneField(EquipmentPayment, on_delete=models.CASCADE, related_name='delivery')
    status = models.CharField(max_length=50, choices=DeliveryStatusChoices.choices, default=DeliveryStatusChoices.PROCESSING)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    equipment_received = models.BooleanField(default=False)
    def __str__(self):
        return f"Delivery for Payment ID: {self.equipment_payment.id}, Status: {self.status}"
    
    


# Now Start for the Products
class Category(models.Model):             #It inherits from models.Model, indicating that it's a Django model.
    slug = models.CharField(max_length=150, null=False, blank=False)
    name = models.CharField(max_length=50, null=False, blank=False)
    image = models.ImageField(upload_to='uploads/category-images', null = True, blank = True)  #An ImageField field, which allows users to upload image files. 
    description = models.TextField(max_length=500, null = False, blank = False)
    status = models.BooleanField(default = False, help_text = "0=default, 1=Hidden")
    trending = models.BooleanField(default = False, help_text = "0=default, 1=Trending")
    created_at = models.DateTimeField(auto_now_add=True)         #This field stores the date and time when the category was created.
    

    def __str__(self):           #This method returns a string representation of the category object.   #it will store the value
        return self.name                    
    

        

class Product(models.Model):
    category = models.name = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    slug = models.CharField(max_length=150, null=False, blank=False)
    name = models.CharField(max_length=50, null=False, blank=False)
    product_image = models.ImageField(upload_to='uploads/product-images', null = True, blank = True, validators=[validate_file_size, FileExtensionValidator(['jpg', 'png'])])  #An ImageField field, which allows users to upload image files. 
    small_description = models.CharField(max_length=250, null = False, blank = False)
    quantity = models.IntegerField(null = False, blank = False)
    description = models.TextField(max_length=500, null = False, blank = False)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank = False)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2,null=False, blank = False)
    status = models.BooleanField(default = False, help_text = "0=default, 1=Hidden")
    trending = models.BooleanField(default = False, help_text = "0=default, 1=Trending")
    tag= models.CharField(max_length=150, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)         #This field stores the date and time when the category was created.
    delivery_sell_charge = models.DecimalField(max_digits=10, decimal_places=2, default=125.00)
    
    
    def __str__(self):           #This method returns a string representation of the category object.
        return self.name
    
    @property
    def total_time(self):
        now = timezone.now()
        return (now - self.created_at).days
    
    def product_owner(self):
        return self.user.username
    
    def product_total_amount(self):
        return self.selling_price * self.quantity
    

class Cart(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product')
    product_qty = models.IntegerField(null=False, blank= False)
    created_at = models.DateTimeField(auto_now_add=True)   
    is_selected = models.BooleanField(default=False)
    
   
    @property
    def total_cost(self):
        try:
            qty = int(self.product_qty)
            price = Decimal(self.product.selling_price)
            # delivery_charge = Decimal(self.product.delivery_sell_charge)
            return price * qty         # Delivery charge will be handled separately
        
        except (ValueError, TypeError):
            return Decimal('0.00')
        
            
    def __str__(self):
        return self.product.name + " " +"Ordered by " + self.user.username

    # This classmethod describes it is a method of the class
#  Helper function to get the total cost of **all selected products**

# Function to calculate total cart cost while ensuring delivery charge is added only once per product owner
def get_total_cart_cost(user):

    cart_items =Cart.objects.filter(user=user, is_selected=True)
    
    total_price = Decimal('0.00')
    
    # Python Defaultdict is a container-like dictionaries present in the module collections.
# It is a sub-class of the dictionary class that returns a dictionary-like object.
# The difference from dictionary is, It provides a default value for the key that does not exist and never raises a KeyError.
    deliver_charge_per_owner = defaultdict(lambda: Decimal('0.00'))
    
    for item in cart_items:
        total_price += item.total_cost
        owner = item.product.user
        
        # Remember it is in for loop. i.e. for each product in cart the this loop is running 
        # Add the delivery charge only once per product owner
        if deliver_charge_per_owner[owner] == Decimal('0.00') :
            deliver_charge_per_owner[owner] = item.product.delivery_sell_charge
            # Adds the delivery charge only once per unique owner when summing up the total.
            
    total_price += sum(deliver_charge_per_owner.values())
    return total_price
        # This  returns the total cost of all selected cart items for the specified user.

# Previous Calculation (Wrong)
# (2 * $100) + $50 (Owner A Delivery)
# + (1 * $200) + $75 (Owner B Delivery)
# = $200 + $50 + $200 + $75
# = **$525**

# New Calculation (Correct)

# (2 * $100) + (1 * $200)
# + $50 (One-time Owner A Delivery)
# + $75 (One-time Owner B Delivery)
# = $200 + $200 + $50 + $75
# = **$525**



      
class CartPayment(CommonPayments):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_payment')
    id = models.UUIDField(primary_key=True, unique=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    delivery_address = models.CharField(max_length=255)
    updated_at = models.DateTimeField(auto_now=True)
    # total_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    def __str__(self):
        return f"Payment for Cart ID: {self.cart.id}, Status: {self.status} by {self.user.username}"      
      
    def save(self, *args, **kwargs):
     
        if self.payment_method in [self.PaymentMethodChoices.ESEWA, self.PaymentMethodChoices.KHALTI]:
            self.status = self.PaymentStatusChoices.CLEARED
            self.payment_type = self.PaymentTypeChoices.ONLINE
        super().save(*args, **kwargs)
      

      
class CartDelivery(models.Model):
    class DeliveryStatusChoicesOfCart(models.TextChoices):
        PENDING = 'pending', 'Pending'
        OWNER_TO_ADMIN = 'owner_to_admin', 'Owner to Admin'
        ADMIN_RECEIVED = 'admin_received', 'Admin Received'
        DELIVERING_TO_USER = 'delivering_to_user', 'Delivering to User'
        DELIVERED = 'delivered', 'Delivered'
        CANCELED = 'canceled', 'Canceled'
        
    cart_payment = models.OneToOneField(CartPayment, on_delete=models.CASCADE, related_name='cart_delivery')
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='admin_deliveries')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=DeliveryStatusChoicesOfCart.choices, default=DeliveryStatusChoicesOfCart.PENDING)
    delivery_date = models.DateField(null=True, blank=True)
    delivery_time = models.TimeField(null=True, blank=True)
    item_received_by_user = models.BooleanField(default=False)
    delivery_location = models.CharField(max_length=50, default="Not Available")
    def __str__(self):
        return f"Delivery for Cart Payment ID: {self.cart_payment.id}, Status: {self.status}"

    def check_all_received(self):
        """
        Check if all product owners have delivered their products.
        If all are received, update the main delivery status.
        """
        if not self.cart_product_deliveries.filter(status=CartProductDelivery.DeliveryStatusChoices.OWNER_TO_ADMIN).exists():
            self.status = self.DeliveryStatusChoicesOfCart.ADMIN_RECEIVED
            self.save()

            
class CartProductDelivery(models.Model):
    """
    Tracks product owners handing over items to the admin.
    Each product owner is responsible for delivering their products.
    """
    class DeliveryStatusChoicesOfOwner(models.TextChoices):
        PENDING = 'pending', 'Pending'
        OWNER_TO_ADMIN = 'owner_to_admin', 'Owner to Admin'
        DELIVERED_TO_ADMIN = 'delivered_to_admin', 'Delivered to Admin'
        
    cart_delivery = models.ForeignKey(CartDelivery, on_delete=models.CASCADE, related_name='cart_product_deliveries')
    product_owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='owner_deliveries')
    status = models.CharField(max_length=50, choices=DeliveryStatusChoicesOfOwner.choices, default=DeliveryStatusChoicesOfOwner.PENDING)
    handover_date = models.DateTimeField(null=True, blank=True)
    
    def __str__(self):
        return f"Owner {self.product_owner.username} | Status: {self.status}"

    def mark_received_by_admin(self):
        """
        Called when the admin confirms receiving all products from this owner.
        """
        self.status = self.DeliveryStatusChoicesOfCart.DELIVERED_TO_ADMIN
        self.save()

        # Check if all product owners have delivered their products
        self.cart_delivery.check_all_received()

      
      
class Trade(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='trade_product')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    wanted_product = models.CharField(max_length=255)
    wanted_quantity = models.IntegerField()
    wanted_price = models.IntegerField()
    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    trade_ending_date = models.DateTimeField()
    def __str__(self):
        return f"Trade of {self.product.name} offered by {self.user.username}"
    
    @property
    def trade_status(self):
        if self.trade_ending_date < timezone.now():
            return "Trade ended"
        else:
            return "Trade active"
            
    def time_left(self):
        return (self.trade_ending_date - timezone.now()).days
    
    def total_amount(self):
        return self.wanted_price * self.wanted_quantity

class TradeRequest(models.Model):
    
    class StatusChoices(models.TextChoices):
        PENDING = 'pending'
        ACCEPTED = 'accepted'
        REJECTED = 'rejected'
        
    trade = models.ForeignKey(Trade, on_delete=models.CASCADE, related_name='trade_requests')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    delivery_location = models.CharField(max_length=255)
    product_name = models.CharField(max_length=255)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='uploads/trade-request-img', null=True,blank=True, validators=[validate_file_size, FileExtensionValidator(['jpg', 'png'])])
    note = models.TextField(max_length=255)
    status = models.CharField(max_length=255, choices=StatusChoices.choices, default=StatusChoices.PENDING)
    
    def __str__(self):
        return f"{self.user.username} wants to trade {self.product_name} for {self.trade.product.name}"
    
    @property
    def total_cost(self):
        return self.price * self.quantity
    
    

class ConfirmedTrade(models.Model):
    
    class DeliveryStatusChoices(models.TextChoices):
        PROCESSING = 'processing', 'Processing'
        DELIVERING = 'delivering', 'Delivering'
        DELIVERED = 'delivered', 'Delivered'
        CANCELED = 'canceled', 'Canceled'
        
    trade_request = models.OneToOneField(TradeRequest, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=50, choices=DeliveryStatusChoices.choices, default=DeliveryStatusChoices.PROCESSING)
    item_location = models.CharField(max_length=255, default='Not available')
    item_received = models.BooleanField(default=False)
    def __str__(self):
        return f"Trade between {self.trade_request.user.username} and {self.trade_request.trade.user.username}"