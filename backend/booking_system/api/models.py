from django.db import models
from django.utils import timezone
from datetime import datetime, timedelta

class TimeSlot(models.Model):
    """
    Representa un slot de tiempo disponible para reservas.
    """
    date = models.DateField(help_text="Fecha del slot")
    start_time = models.TimeField(help_text="Hora de inicio")
    end_time = models.TimeField(help_text="Hora de fin")
    max_bookings = models.IntegerField(default=1, help_text="Cantidad máxima de reservas para este slot")
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('date', 'start_time')
        ordering = ['date', 'start_time']
        verbose_name = 'Time Slot'
        verbose_name_plural = 'Time Slots'

    def __str__(self):
        return f"{self.date} - {self.start_time} a {self.end_time}"

    def get_booked_count(self):
        """Cantidad de reservas confirmadas para este slot"""
        return self.bookings.filter(status='confirmed').count()

    def get_available_spots(self):
        """Espacios disponibles en este slot"""
        return self.max_bookings - self.get_booked_count()

    def is_slot_available(self):
        """Verifica si hay espacios disponibles"""
        return self.is_available and self.get_available_spots() > 0


class Booking(models.Model):
    """
    Representa una reserva de un lead para una presentación Zoom.
    """
    STATUS_CHOICES = [
        ('pending', 'Pendiente'),
        ('confirmed', 'Confirmado'),
        ('cancelled', 'Cancelado'),
        ('completed', 'Completado'),
    ]

    timeslot = models.ForeignKey(TimeSlot, on_delete=models.CASCADE, related_name='bookings')
    
    # Información del lead
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True)
    company_name = models.CharField(max_length=200, blank=True)
    
    # Detalles de la reserva
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    zoom_link = models.URLField(blank=True, null=True, help_text="Link generado automáticamente")
    notes = models.TextField(blank=True)
    
    # Auditoría
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Booking'
        verbose_name_plural = 'Bookings'

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.timeslot.date} {self.timeslot.start_time}"

    def get_full_name(self):
        return f"{self.first_name} {self.last_name}".strip()
