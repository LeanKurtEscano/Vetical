# Generated by Django 5.1.6 on 2025-02-20 06:21

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Specializations',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialization', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='Veterinarian',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('phone_number', models.CharField(max_length=15, unique=True)),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('clinic_address', models.TextField()),
                ('years_of_experience', models.PositiveIntegerField(blank=True, null=True)),
                ('education', models.TextField(blank=True, null=True)),
                ('license_number', models.CharField(max_length=50, unique=True)),
                ('latitude', models.FloatField(blank=True, null=True)),
                ('longitude', models.FloatField(blank=True, null=True)),
                ('user_id', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='veterinarian', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='VeterinarianSpecialization',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('specialization_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='veterinarian.specializations')),
                ('veterinarian_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='specializations', to='veterinarian.veterinarian')),
            ],
        ),
    ]
