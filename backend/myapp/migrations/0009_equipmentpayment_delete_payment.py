# Generated by Django 5.0.8 on 2025-02-08 02:21

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0008_alter_equipment_quantity'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EquipmentPayment',
            fields=[
                ('payment_method', models.CharField(choices=[('esewa', 'Esewa'), ('cash', 'Cash'), ('khalti', 'Khalti')], max_length=50)),
                ('amount', models.PositiveIntegerField()),
                ('date_paid', models.DateField(auto_now_add=True)),
                ('payment_type', models.CharField(choices=[('online', 'Online'), ('offline', 'Offline')], default='online', max_length=50)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('cleared', 'Cleared')], default='pending', max_length=50)),
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False, unique=True)),
                ('equipment_booking', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to='myapp.equipmentbooking')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payments', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.DeleteModel(
            name='Payment',
        ),
    ]
