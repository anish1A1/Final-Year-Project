# Generated by Django 5.0.8 on 2025-03-02 10:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0035_cartpayment_total_amount'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='cartpayment',
            name='total_amount',
        ),
        migrations.AddField(
            model_name='cartpayment',
            name='updated_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
