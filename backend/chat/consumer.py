from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync

from chat.models import Conversation


class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status and send notification.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_name = None
        self.conversation = None

    def connect(self):
        self.user = self.scope["user"]
        print("Connected")

        print("User connected: " + str(self.user))
        if not self.user.is_authenticated:
            return

        self.accept()
        self.conversation_name = (
            f"{self.scope['url_route']['kwargs']['conversation_name']}"
        )
        self.conversation, created = Conversation.objects.get_or_create(
            name=self.conversation_name
        )

        async_to_sync(self.channel_layer.group_add)(
            self.conversation_name, self.conversation
        )
        self.send_json(
            {
                "type": "welcome_message",
                "message": "Hello there!\
                    You have successfully connected to bonfire!",
            }
        )

    def disconnect(self, code):
        print("Disconnected")
        return super().disconnect(code)

    def receive_json(self, content, **kwargs):
        message_type = content["type"]
        if message_type == "chat_message":
            print("chat_message")
            async_to_sync(self.channel_layer.group_send)(
                self.conversation_name,
                {
                    "type": "chat_message_echo",
                    "name": content["name"],
                    "message": content["message"],
                },
            )

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)
