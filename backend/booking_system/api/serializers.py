from rest_framework import serializers
from .models import TimeSlot, Booking
from datetime import datetime

class TimeSlotSerializer(serializers.ModelSerializer):
    booked_count = serializers.SerializerMethodField()
    available_spots = serializers.SerializerMethodField()
    is_available = serializers.SerializerMethodField()

    class Meta:
        model = TimeSlot
        fields = ['id', 'date', 'start_time', 'end_time', 'max_bookings', 'booked_count', 'available_spots', 'is_available']

    def get_booked_count(self, obj):
        return obj.get_booked_count()

    def get_available_spots(self, obj):
        return obj.get_available_spots()

    def get_is_available(self, obj):
        return obj.is_slot_available()


class BookingSerializer(serializers.ModelSerializer):
    timeslot_date = serializers.CharField(source='timeslot.date', read_only=True)
    timeslot_start_time = serializers.CharField(source='timeslot.start_time', read_only=True)
    timeslot_end_time = serializers.CharField(source='timeslot.end_time', read_only=True)

    class Meta:
        model = Booking
        fields = [
            'id', 'timeslot', 'first_name', 'last_name', 'email', 'phone',
            'company_name', 'status', 'zoom_link', 'notes',
            'timeslot_date', 'timeslot_start_time', 'timeslot_end_time',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at', 'zoom_link']

    def create(self, validated_data):
        booking = Booking.objects.create(**validated_data)
        booking.status = 'confirmed'
        booking.zoom_link = f"https://zoom.us/meeting/{booking.id}{int(booking.created_at.timestamp())}"
        booking.save()
        return booking
