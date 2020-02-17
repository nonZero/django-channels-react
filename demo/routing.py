from django.urls import path

from . import consumers

websocket_urlpatterns = [
    path('yo/', consumers.MonitorConsumer),
]
