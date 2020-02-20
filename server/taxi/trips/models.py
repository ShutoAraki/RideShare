import uuid

from django.shortcuts import reverse
from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings

class User(AbstractUser):
    avg_rating = models.FloatField(null=True, blank=True, default=None)
    latitude = models.FloatField(null=True, blank=True, default=None)
    longitude = models.FloatField(null=True, blank=True, default=None)
    venmo_id = models.CharField(max_length=50)
    photo = models.ImageField(upload_to='photos', null=True, blank=True)

    @property
    def group(self):
        groups = self.groups.all()
        return groups[0].name if groups else None

    def __str__(self):
        return self.first_name + " " + self.last_name

class Trip(models.Model):
    REQUESTED = 'REQUESTED'
    STARTED = 'STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'
    STATUSES = (
        (REQUESTED, REQUESTED),
        (STARTED, STARTED),
        (IN_PROGRESS, IN_PROGRESS),
        (COMPLETED, COMPLETED),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    pick_up_address = models.CharField(max_length=255)
    drop_off_address = models.CharField(max_length=255)
    group_size = models.IntegerField(default=1)
    carpool = models.BooleanField(default=True)
    # estimated_pick_up_time = models.TimeField(null=True, blank=True)
    estimated_pick_up_time = models.CharField(max_length=255, null=True, blank=True)
    price = models.FloatField(default=0.0)
    status = models.CharField(
        max_length=20, choices=STATUSES, default=REQUESTED
    )

    driver = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_driver'
    )
    rider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        null=True,
        blank=True,
        on_delete=models.DO_NOTHING,
        related_name='trips_as_rider'
    )

    def __str__(self):
        return f'{self.id}'

    def get_absolute_url(self):
        return reverse('trip:trip_detail', kwargs={'trip_id': self.id})

