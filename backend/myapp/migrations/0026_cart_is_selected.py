# Generated by Django 5.0.8 on 2025-02-28 03:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0025_equipmentdelivery_equipment_received'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='is_selected',
            field=models.BooleanField(default=True),
        ),
    ]
