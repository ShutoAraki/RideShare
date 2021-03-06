# Generated by Django 2.2.5 on 2019-11-06 04:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('trips', '0006_auto_20191031_0449'),
    ]

    operations = [
        migrations.AddField(
            model_name='trip',
            name='carpool',
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name='trip',
            name='estimated_pick_up_time',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='trip',
            name='group_size',
            field=models.IntegerField(default=1),
        ),
    ]
