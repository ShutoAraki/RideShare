from django.contrib.auth import get_user_model, login, logout
from django.contrib.auth.forms import AuthenticationForm
# django.db.models.Q encapsulates filters as objects that can then be combined 
# logically using & and |
from django.db.models import Q
from rest_framework import generics, permissions, status, views, viewsets
from rest_framework.response import Response

from .models import Trip
from .serializers import ReadOnlyTripSerializer, UserSerializer


class SignUpView(generics.CreateAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer

class LogInView(views.APIView):
    def post(self, request):
        form = AuthenticationForm(data=request.data)
        if form.is_valid():
            user = form.get_user()
            login(request, user=form.get_user())
            return Response(UserSerializer(user).data)
        else:
            return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)

class LogOutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, *args, **kwargs):
        logout(self.request)
        return Response(status=status.HTTP_204_NO_CONTENT)

class TripView(viewsets.ReadOnlyModelViewSet):
    lookup_field = 'id'
    lookup_url_kwarg = 'trip_id'
    permission_classes = (permissions.IsAuthenticated,)
    # queryset = Trip.objects.all()
    serializer_class = ReadOnlyTripSerializer

    # override -> Get different view depending on
    # whether a user is a driver or a rider
    def get_queryset(self):
        user = self.request.user
        if user.group == 'driver':
            # Only show trips that are requested or 
            # the user him/herself is the driver
            return Trip.objects.filter(
                Q(status=Trip.REQUESTED) | Q(driver=user)
            )
        if user.group == 'rider':
            return Trip.objects.filter(rider=user)
        else:
            return Trip.objects.none()