import logging

from channels.generic.websocket import JsonWebsocketConsumer

logger = logging.getLogger(__name__)


class MonitorConsumer(JsonWebsocketConsumer):
    def connect(self):
        logger.info("> Connected")
        self.accept()

    def disconnect(self, close_code):
        logger.info("< Disconnected")

    def receive_json(self, data):
        logger.info(f"- Recieve: {data!r}")

        # message = text_data_json['message']
        #
        self.send_json({
            'message': 'pong',
        })
