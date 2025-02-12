# Generated by Django 5.0.8 on 2025-02-12 04:44

import django.core.validators
import django.db.models.deletion
import myapp.models
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0011_alter_equipmentpayment_amount'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=150)),
                ('name', models.CharField(max_length=50)),
                ('image', models.ImageField(blank=True, null=True, upload_to='uploads/category-images')),
                ('description', models.TextField(max_length=500)),
                ('status', models.BooleanField(default=False, help_text='0=default, 1=Hidden')),
                ('trending', models.BooleanField(default=False, help_text='0=default, 1=Trending')),
                ('meta_title', models.CharField(max_length=150)),
                ('meta_keywords', models.CharField(max_length=150)),
                ('meta_description', models.TextField(max_length=500)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('slug', models.CharField(max_length=150)),
                ('name', models.CharField(max_length=50)),
                ('product_image', models.ImageField(blank=True, null=True, upload_to='uploads/product-images', validators=[myapp.models.validate_file_size, django.core.validators.FileExtensionValidator(['jpg', 'png'])])),
                ('small_description', models.CharField(max_length=250)),
                ('quantity', models.IntegerField()),
                ('description', models.TextField(max_length=500)),
                ('original_price', models.FloatField()),
                ('selling_price', models.FloatField()),
                ('status', models.BooleanField(default=False, help_text='0=default, 1=Hidden')),
                ('trending', models.BooleanField(default=False, help_text='0=default, 1=Trending')),
                ('tag', models.CharField(max_length=150)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('delivery_sell_charge', models.DecimalField(decimal_places=2, max_digits=10)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.category')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
