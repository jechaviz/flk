from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils import timezone
from datetime import datetime, timedelta
from .models import TimeSlot, Booking
from .serializers import TimeSlotSerializer, BookingSerializer


class AvailableSlotsView(APIView):
    """
    GET: Retorna los slots disponibles para el mes/año solicitado
    """
    def get(self, request):
        # Obtener parámetros
        year = request.query_params.get('year', timezone.now().year)
        month = request.query_params.get('month', timezone.now().month)
        
        try:
            year = int(year)
            month = int(month)
        except ValueError:
            return Response({'error': 'Invalid year or month'}, status=status.HTTP_400_BAD_REQUEST)

        # Obtener slots del mes
        from datetime import date
        first_day = date(year, month, 1)
        if month == 12:
            last_day = date(year + 1, 1, 1) - timedelta(days=1)
        else:
            last_day = date(year, month + 1, 1) - timedelta(days=1)

        slots = TimeSlot.objects.filter(
            date__gte=first_day,
            date__lte=last_day,
            is_available=True
        ).order_by('date', 'start_time')

        serializer = TimeSlotSerializer(slots, many=True)
        
        # Retornar con estructura de calendario
        return Response({
            'year': year,
            'month': month,
            'slots': serializer.data,
            'available_days': [slot['date'] for slot in serializer.data]
        })


class TimeSlotViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API para gestionar Time Slots (Horarios disponibles)
    """
    queryset = TimeSlot.objects.filter(is_available=True).order_by('date', 'start_time')
    serializer_class = TimeSlotSerializer

    @action(detail=False, methods=['get'])
    def by_date(self, request):
        """Obtener slots por fecha específica"""
        date_str = request.query_params.get('date')
        if not date_str:
            return Response({'error': 'date parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format (use YYYY-MM-DD)'}, status=status.HTTP_400_BAD_REQUEST)

        slots = TimeSlot.objects.filter(date=date_obj, is_available=True).order_by('start_time')
        serializer = self.get_serializer(slots, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def available_times(self, request):
        """Obtener horas disponibles para una fecha"""
        date_str = request.query_params.get('date')
        if not date_str:
            return Response({'error': 'date parameter required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            date_obj = datetime.strptime(date_str, '%Y-%m-%d').date()
        except ValueError:
            return Response({'error': 'Invalid date format (use YYYY-MM-DD)'}, status=status.HTTP_400_BAD_REQUEST)

        slots = TimeSlot.objects.filter(date=date_obj, is_available=True).order_by('start_time')
        
        times = []
        for slot in slots:
            if slot.is_slot_available():
                times.append({
                    'id': slot.id,
                    'time': str(slot.start_time),
                    'end_time': str(slot.end_time),
                    'available_spots': slot.get_available_spots()
                })
        
        return Response(times)


class BookingViewSet(viewsets.ModelViewSet):
    """
    API para crear y gestionar reservas
    """
    queryset = Booking.objects.all().order_by('-created_at')
    serializer_class = BookingSerializer

    def create(self, request, *args, **kwargs):
        """Crear una nueva reserva"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # Verificar disponibilidad del slot
        timeslot = TimeSlot.objects.get(id=serializer.validated_data['timeslot'].id)
        if not timeslot.is_slot_available():
            return Response(
                {'error': 'No hay espacios disponibles en este horario'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    @action(detail=False, methods=['get'])
    def by_email(self, request):
        """Obtener reservas por email"""
        email = request.query_params.get('email')
        if not email:
            return Response({'error': 'email parameter required'}, status=status.HTTP_400_BAD_REQUEST)
        
        bookings = Booking.objects.filter(email=email).order_by('-created_at')
        serializer = self.get_serializer(bookings, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        """Cancelar una reserva"""
        booking = self.get_object()
        booking.status = 'cancelled'
        booking.save()
        return Response({'status': 'Reserva cancelada'})

    @action(detail=True, methods=['post'])
    def confirm(self, request, pk=None):
        """Confirmar una reserva"""
        booking = self.get_object()
        booking.status = 'confirmed'
        booking.save()
        return Response(self.get_serializer(booking).data)
