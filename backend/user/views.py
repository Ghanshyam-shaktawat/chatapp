from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import generics
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer
from django.contrib.auth import get_user_model
from rest_framework import status

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


class RegisterView(generics.CreateAPIView):
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
