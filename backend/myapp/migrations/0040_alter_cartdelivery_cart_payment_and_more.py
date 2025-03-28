# Generated by Django 5.0.8 on 2025-03-09 03:14

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0039_cartdelivery_handover_date_alter_cartdelivery_status_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cartdelivery',
            name='cart_payment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='cart_delivery', to='myapp.cartpayment'),
        ),
        migrations.RemoveField(
            model_name='cartpayment',
            name='cart',
        ),
        migrations.AddField(
            model_name='cartpayment',
            name='cart',
            field=models.ManyToManyField(related_name='cart_payment', to='myapp.cart'),
        ),
    ]
