# Generated by Django 5.0.8 on 2025-03-02 04:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0032_alter_cartpayment_cart'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartdelivery',
            name='cart_payment',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='cart_delivery', to='myapp.cartpayment'),
        ),
        migrations.AlterField(
            model_name='cartpayment',
            name='cart',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_payment', to='myapp.cart'),
        ),
    ]
