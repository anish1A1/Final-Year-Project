# Generated by Django 5.0.8 on 2025-02-07 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0007_equipment_availability_status_equipment_quantity_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='equipment',
            name='quantity',
            field=models.IntegerField(),
        ),
    ]
