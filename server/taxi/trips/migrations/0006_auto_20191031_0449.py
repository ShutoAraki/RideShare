# Generated by Django 2.2.5 on 2019-10-31 04:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0005_user_photo'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='trip',
            name='carpool',
        ),
        migrations.RemoveField(
            model_name='trip',
            name='estimated_pick_up_time',
        ),
        migrations.RemoveField(
            model_name='trip',
            name='group_size',
        ),
    ]