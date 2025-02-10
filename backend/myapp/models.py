from django.db import models
import datetime
from django.contrib.auth.models import User
import os
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator
import uuid
def validate_file_size(value):
    filesize = value.size
    if filesize > 10485760:  # 10 MB limit
        raise ValidationError("Maximum file size is 10MB")


# in image field there is  get_file_path  we are creating a function of that
# def get_image_file_path(request, filename):
#     nowTime = datetime.datetime.now().strftime("%Y%m%d%H%M%S")  # getting the current time and date
#     filename = f"{nowTime}_{filename}"
#     return os.path.join('uploads/images', filename)

# def get_manual_file_path(request, filename):
#     nowTime = datetime.datetime.now().strftime("%Y%m%d%H%M%S")  # getting the current time and date
#     filename = f"{nowTime}_{filename}"
#     return os.path.join('uploads/manuals', filename)
#     The purpose of this function is to:

# Prevent filename collisions by adding a unique timestamp to each uploaded file
# Store uploaded files in a designated uploads/ directory
    

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
        return f"Booking for {self.equipment.name} from {self.start_date} to {self.end_date}"
    
 

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
    
    def __str__(self):
        return f"Delivery for Payment ID: {self.equipment_payment.id}, Status: {self.status}"