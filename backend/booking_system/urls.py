from django.urls import path, include
from rest_framework.routers import DefaultRouter
from api.views import TimeSlotViewSet, BookingViewSet, AvailableSlotsView

router = DefaultRouter()
router.register(r'timeslots', TimeSlotViewSet)
router.register(r'bookings', BookingViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/available-slots/', AvailableSlotsView.as_view(), name='available-slots'),
]
