import logging

from asgiref.sync import async_to_sync
from channels.generic.websocket import JsonWebsocketConsumer
from django.utils.crypto import get_random_string

logger = logging.getLogger(__name__)


class MonitorConsumer(JsonWebsocketConsumer):
    GROUP_NAME = "monitors"

    def subscribe(self):
        async_to_sync(self.channel_layer.group_add)(self.GROUP_NAME, self.channel_name)

    def unsubscribe(self):
        async_to_sync(self.channel_layer.group_discard)(self.GROUP_NAME, self.channel_name)

    def publish(self, payload):
        async_to_sync(self.channel_layer.group_send)(self.GROUP_NAME, {
            "type": f"{self.GROUP_NAME}.message",
            "payload": payload
        })

    def monitors_message(self, event):
        logger.info(f"* Event {self.channel_name}: {event!r}")
        payload = event.get('payload', {})
        self.send_json({
            **payload,
        })

    def connect(self):
        self.uid = get_random_string(6)
        logger.info(f"> Connected {self.channel_name}")
        self.accept()
        self.publish({
            'type': f'join',
            'uid': self.uid,
        })
        self.subscribe()
        self.send_json({
            'type': 'welcome',
            'uid': self.uid,
        })

    def disconnect(self, close_code):
        logger.info(f"> Disconnected {self.uid}")
        self.unsubscribe()
        self.publish({
            'type': f'left',
            'uid': self.uid,
        })

    def receive_json(self, data):
        logger.info(f"- Recieve {self.uid}: {data!r}")
        self.publish({
            'type': f'ping',
            'uid': self.uid,
            **data,
        })
