from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DefaultUserAdmin

from .models import Trip, User

@admin.register(User)
class UserAdmin(DefaultUserAdmin):
    list_display = ('username', 'group')

@admin.register(Trip)
class TripAdmin(admin.ModelAdmin):
    fields = (
        'id', 'pick_up_address', 'drop_off_address', 'status',
        'driver', 'rider', 'created', 'updated', 
        'estimated_pick_up_time', 'group_size', 'carpool',
    )
    list_display = (
        'id', 'pick_up_address', 'drop_off_address', 'status',
        'driver', 'rider', 'created', 'updated', 
        'estimated_pick_up_time', 'group_size', 'carpool',
    )
    list_filter = (
        'status', 'carpool',
    )
    readonly_fields = (
        'id', 'created', 'updated',
    )