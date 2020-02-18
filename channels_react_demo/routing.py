from channels.routing import ProtocolTypeRouter, URLRouter

import demo.routing

application = ProtocolTypeRouter({
    'websocket': URLRouter(
        demo.routing.websocket_urlpatterns,
    )
})
