# Generated by Django 5.1.6 on 2025-02-23 07:20

import cloudinary.models
import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veterinarian', '0006_alter_clinics_latitude_alter_clinics_longitude_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='clinics',
            name='registered_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.CreateModel(
            name='ClinicImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', cloudinary.models.CloudinaryField(max_length=255, verbose_name='image')),
                ('uploaded_at', models.DateTimeField(auto_now_add=True)),
                ('clinic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='veterinarian.clinics')),
            ],
        ),
        migrations.DeleteModel(
            name='ClinicImage',
        ),
    ]
