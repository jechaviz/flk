"""
Script para probar la API de reservas
Uso: python test_api.py
"""
import requests
import json
from datetime import datetime, timedelta

API_URL = "http://localhost:8000/api"

def test_available_slots():
    """Prueba obtener slots disponibles"""
    print("\n📅 TEST: Obtener slots disponibles")
    print("-" * 50)
    
    today = datetime.now()
    response = requests.get(
        f"{API_URL}/available-slots/",
        params={
            'year': today.year,
            'month': today.month
        }
    )
    
    if response.status_code == 200:
        data = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"   Mes: {data['month']}/{data['year']}")
        print(f"   Días disponibles: {len(data['available_days'])}")
        if data['available_days']:
            print(f"   Primer día: {data['available_days'][0]}")
        return data['available_days'][0] if data['available_days'] else None
    else:
        print(f"❌ Status: {response.status_code}")
        return None


def test_available_times(date_str):
    """Prueba obtener horarios disponibles"""
    if not date_str:
        print("\n⏰ TEST: No hay fechas disponibles para probar")
        return None
    
    print("\n⏰ TEST: Obtener horarios disponibles")
    print("-" * 50)
    
    response = requests.get(
        f"{API_URL}/timeslots/available_times/",
        params={'date': date_str}
    )
    
    if response.status_code == 200:
        times = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"   Fecha: {date_str}")
        print(f"   Horarios disponibles: {len(times)}")
        if times:
            print(f"   Primer horario: {times[0]['time']}")
        return times[0]['id'] if times else None
    else:
        print(f"❌ Status: {response.status_code}")
        return None


def test_create_booking(timeslot_id):
    """Prueba crear una reserva"""
    if not timeslot_id:
        print("\n📝 TEST: No hay horarios para crear reserva")
        return
    
    print("\n📝 TEST: Crear una reserva")
    print("-" * 50)
    
    booking_data = {
        "timeslot": timeslot_id,
        "first_name": "Test",
        "last_name": "User",
        "email": "test@example.com",
        "phone": "+52 1234567890",
        "company_name": "Test Company",
        "notes": "Reserva de prueba"
    }
    
    response = requests.post(
        f"{API_URL}/bookings/",
        json=booking_data,
        headers={'Content-Type': 'application/json'}
    )
    
    if response.status_code == 201:
        booking = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"   ID de reserva: {booking['id']}")
        print(f"   Email: {booking['email']}")
        print(f"   Estado: {booking['status']}")
        print(f"   Zoom Link: {booking['zoom_link']}")
        return booking['id']
    else:
        print(f"❌ Status: {response.status_code}")
        print(f"   Error: {response.text}")
        return None


def test_get_bookings():
    """Prueba obtener todas las reservas"""
    print("\n📊 TEST: Obtener todas las reservas")
    print("-" * 50)
    
    response = requests.get(f"{API_URL}/bookings/")
    
    if response.status_code == 200:
        bookings = response.json()
        print(f"✅ Status: {response.status_code}")
        print(f"   Total de reservas: {len(bookings)}")
        if bookings:
            print(f"   Última reserva: {bookings[0]['first_name']} {bookings[0]['last_name']}")
    else:
        print(f"❌ Status: {response.status_code}")


def main():
    print("=" * 50)
    print("PRUEBAS DE API - Freedom Lifestyle Key")
    print("=" * 50)
    
    # Verificar conexión
    try:
        response = requests.get(f"{API_URL}/available-slots/", params={'year': 2026, 'month': 1}, timeout=2)
        print(f"\n✅ Conexión exitosa con API")
        print(f"   Base URL: {API_URL}")
    except Exception as e:
        print(f"\n❌ Error de conexión: {e}")
        print(f"   ¿Django está corriendo en http://localhost:8000?")
        return
    
    # Ejecutar pruebas
    available_date = test_available_slots()
    
    if available_date:
        timeslot_id = test_available_times(available_date)
        
        if timeslot_id:
            booking_id = test_create_booking(timeslot_id)
            test_get_bookings()
    
    print("\n" + "=" * 50)
    print("PRUEBAS COMPLETADAS")
    print("=" * 50 + "\n")


if __name__ == '__main__':
    main()
