from rest_framework.decorators import APIView, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import (
    MyTokenObtainPairSerializer,
    RegisterSerializer,
    UserViewsetSerializer,
)
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView, ListAPIView
from .models import FriendRequest
from django.shortcuts import get_object_or_404

User = get_user_model()


@api_view(["GET"])
def api_routes(request):
    routes = [
        "api/register/",
        "api/token/",
        "api/token/refresh/",
        "api/home/",
    ]
    return Response(routes)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = (AllowAny,)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def test_chat_endpoint(request):
    """
    Test Whether the websocket token is valid by making a dummy api call to
    test

    Args:
        request (http request)

    Returns:
        Response with http status
    """
    if request.method == "GET":
        data = f"congrulations {request.user}, your api is working!"
        return Response({"response": data}, status=status.HTTP_200_OK)


# class UserViewset(ListAPIView):
#     queryset = User.objects.all()
#     permission_classes = [AllowAny]
#     serializer_class = UserViewsetSerializer
#


class FriendListView(ListAPIView):
    serializer_class = UserViewsetSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        friend_requests_received = FriendRequest.objects.filter(
            to_user=user, status="accepted"
        )
        friend_requests_sent = FriendRequest.objects.filter(
            from_user=user, status="accepted"
        )
        friends_received = [fr.from_user for fr in friend_requests_received]
        friends_sent = [fr.to_user for fr in friend_requests_sent]
        friends = list(set(friends_received) | set(friends_sent))
        return friends


class AddFriend(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, to_username):
        from_user = request.user
        to_user = get_object_or_404(User, username=to_username)

        # Check if any pending request exists
        existing_request = FriendRequest.objects.filter(
            from_user=from_user, to_user=to_user
        ).first()

        if existing_request:
            return Response({"detail": "Friend request alredy pending"})

        friend_req = FriendRequest.create_friend_req(from_user, to_user)
        return Response({"user": to_user.username, "id": to_user.id})
