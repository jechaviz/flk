"""
Script para inicializar la base de datos con slots de ejemplo
"""
import os
import django
from datetime import datetime, timedelta, time

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'booking_system.settings')
django.setup()

from api.models import TimeSlot

def create_demo_slots():
    """Crea slots de demostración para los próximos 30 días"""
    today = datetime.now().date()
    hours = [
        ('09:00:00', '09:30:00'),
        ('10:00:00', '10:30:00'),
        ('11:00:00', '11:30:00'),
        ('14:00:00', '14:30:00'),
        ('15:00:00', '15:30:00'),
        ('16:00:00', '16:30:00'),
        ('17:00:00', '17:30:00'),
    ]
    
    created = 0
    for i in range(30):
        date = today + timedelta(days=i)
        # Saltar fin de semana (5=sábado, 6=domingo)
        if date.weekday() >= 5:
            continue
        
        for start_str, end_str in hours:
            start_time = datetime.strptime(start_str, '%H:%M:%S').time()
            end_time = datetime.strptime(end_str, '%H:%M:%S').time()
            
            slot, created_flag = TimeSlot.objects.get_or_create(
                date=date,
                start_time=start_time,
                defaults={
                    'end_time': end_time,
                    'max_bookings': 1,
                    'is_available': True
                }
            )
            if created_flag:
                created += 1
    
    return created

if __name__ == '__main__':
    total = create_demo_slots()
    print(f"✓ Se crearon {total} slots de demostración")
    print("✓ Base de datos inicializada correctamente")
