# Generated by Django 5.0.8 on 2025-03-02 13:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0037_remove_cartdelivery_item_location_cartdelivery_admin_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='cartdelivery',
            name='delivery_location',
            field=models.CharField(default='Not Available', max_length=50),
        ),
    ]
