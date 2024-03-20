from channels.generic.websocket import JsonWebsocketConsumer
from asgiref.sync import async_to_sync
from django.contrib.auth import get_user_model

User = get_user_model()


class ChatConsumer(JsonWebsocketConsumer):
    """
    This consumer is used to show user's online status and send notification.
    """

    def __init__(self, *args, **kwargs):
        super().__init__(args, kwargs)
        self.user = None
        self.conversation_name = None
        self.conversation = None
        self.room_name = None
        # self.access_token = None

    def connect(self):
        print("Connected")

        self.user = self.scope["user"]
        print("User connected: " + str(self.user))
        if not self.user.is_authenticated:
            return

        self.room_name = "home"
        self.accept()
        async_to_sync(self.channel_layer.group_add)(self.room_name, self.channel_name)
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
                self.room_name,
                {
                    "type": "chat_message_echo",
                    "name": content["name"],
                    "message": content["message"],
                },
            )

    def chat_message_echo(self, event):
        print(event)
        self.send_json(event)
        if self.user.is_authenticated:
            print("PATA NA")
        else:
            print("NAHI PATA")

    # def handle_token_update(self, content):
    #     token = content.get("token")
    #     if token:
    #         try:
    #             self.access_token = AccessToken(token)
    #             print("token updated: ", self.access_token)
    #             user_id = self.access_token["user_id"]
    #             self.user = User.objects.get(id=user_id)
    #
    #         except TokenError as e:
    #             print("Token update failed:", e)
    #
    #     else:
    #         print("Token not provided in the update token message")
