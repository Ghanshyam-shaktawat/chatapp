"""
ASGI config for config project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.0/howto/deployment/asgi/
"""

import os
from django.core.asgi import get_asgi_application

# Import websocket application here
from config import routing
from channels.routing import ProtocolTypeRouter, URLRouter
from chat.middleware import WEBSoketAuthenticationMiddleware

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")

application = ProtocolTypeRouter(
    {
        "http": get_asgi_application(),
        "websocket": WEBSoketAuthenticationMiddleware(
            URLRouter(routing.websocket_urlpatterns)
        ),
    }
)
