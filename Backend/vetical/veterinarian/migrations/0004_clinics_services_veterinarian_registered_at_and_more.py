# Generated by Django 5.1.6 on 2025-02-22 14:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('veterinarian', '0003_veterinarian_first_name_veterinarian_last_name_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clinics',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clinic_name', models.CharField(max_length=255, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('service', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='veterinarian',
            name='registered_at',
            field=models.TimeField(auto_now_add=True, null=True),
        ),
        migrations.CreateModel(
            name='ClinicImages',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField(blank=True, null=True)),
                ('clinic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='veterinarian.clinics')),
            ],
        ),
        migrations.CreateModel(
            name='ClinicServices',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('clinic', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='veterinarian.clinics')),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='veterinarian.services')),
            ],
        ),
    ]
