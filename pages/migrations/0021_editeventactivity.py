# Generated by Django 5.0 on 2024-04-30 17:29

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0020_createclub_club_achievement1_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='EditEventActivity',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('clubvicemanager', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('eventtitle', models.CharField(max_length=100)),
                ('categories', models.CharField(max_length=100)),
                ('event_image', models.ImageField(upload_to='event_images')),
                ('date', models.DateField()),
                ('time', models.TimeField()),
                ('location', models.CharField(max_length=100)),
                ('phonenumber', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('approved', models.BooleanField(default=False, verbose_name='Approved')),
                ('clubmanager', models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='activites_managed_edit', to=settings.AUTH_USER_MODEL)),
                ('clubname', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='activities_Eedit', to='pages.createclub')),
            ],
        ),
    ]
