import os

from channels.routing import ProtocolTypeRouter, URLRouter

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'channels_react_demo.settings')

import demo.routing

application = ProtocolTypeRouter({
    'websocket': URLRouter(
        demo.routing.websocket_urlpatterns,
    )
})
