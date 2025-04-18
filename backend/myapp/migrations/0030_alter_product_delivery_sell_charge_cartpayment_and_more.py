# Generated by Django 5.0.8 on 2025-03-02 03:15

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0029_alter_cart_is_selected_alter_cart_product_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='delivery_sell_charge',
            field=models.DecimalField(decimal_places=2, default=125.0, max_digits=10),
        ),
        migrations.CreateModel(
            name='CartPayment',
            fields=[
                ('payment_method', models.CharField(choices=[('esewa', 'Esewa'), ('cash', 'Cash'), ('khalti', 'Khalti')], max_length=50)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('date_paid', models.DateField(auto_now_add=True)),
                ('payment_type', models.CharField(choices=[('online', 'Online'), ('offline', 'Offline')], default='offline', max_length=50)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('cleared', 'Cleared')], default='pending', max_length=50)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('delivery_address', models.CharField(default='Dharan', max_length=255)),
                ('cart', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_payment', to='myapp.cart')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CartDelivery',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('delivery_date', models.DateField()),
                ('delivery_time', models.TimeField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[('processing', 'Processing'), ('delivering', 'Delivering'), ('delivered', 'Delivered'), ('canceled', 'Canceled')], default='processing', max_length=50)),
                ('item_location', models.CharField(default='Not available', max_length=255)),
                ('item_received_by_user', models.BooleanField(default=False)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('cart_payment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_delivery', to='myapp.cartpayment')),
            ],
        ),
    ]
