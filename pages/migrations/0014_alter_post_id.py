# Generated by Django 5.0 on 2024-04-25 23:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pages', '0013_remove_eventactivity_clubmanager'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='id',
            field=models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID'),
        ),
    ]
