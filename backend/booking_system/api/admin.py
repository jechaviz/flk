from django.contrib import admin
from .models import TimeSlot, Booking

@admin.register(TimeSlot)
class TimeSlotAdmin(admin.ModelAdmin):
    list_display = ['date', 'start_time', 'end_time', 'max_bookings', 'get_booked_count', 'is_available']
    list_filter = ['date', 'is_available']
    search_fields = ['date']
    date_hierarchy = 'date'

@admin.register(Booking)
class BookingAdmin(admin.ModelAdmin):
    list_display = ['get_full_name', 'email', 'timeslot', 'status', 'created_at']
    list_filter = ['status', 'created_at', 'timeslot__date']
    search_fields = ['first_name', 'last_name', 'email', 'company_name']
    date_hierarchy = 'created_at'
    readonly_fields = ['created_at', 'updated_at', 'zoom_link']
