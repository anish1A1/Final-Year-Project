from django.db import models
import datetime
from django.contrib.auth.models import User
import os
from django.core.exceptions import ValidationError
from django.core.validators import FileExtensionValidator

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
    availability_status = models.BooleanField(default=True)
    quantity = models.IntegerField()
    hourly_rate = models.DecimalField(max_digits=10, decimal_places=2)
    user_manual = models.FileField(upload_to='uploads/manuals', null=True, blank=True, validators=[validate_file_size, FileExtensionValidator(['pdf', 'docx'])])
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='equipment')
    delivery_charge = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name