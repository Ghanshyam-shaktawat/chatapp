from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    MyTokenObtainPairView,
    RegisterView,
    FriendListView,
    AddFriend,
    api_routes,
    test_chat_endpoint,
)

urlpatterns = [
    path("token/", MyTokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("register/", RegisterView.as_view(), name="register"),
    # path("users/", UserViewset.as_view(), name="all_users"),
    path("friends/", FriendListView.as_view(), name="friends_list"),
    path("add_friend/<str:to_username>/", AddFriend.as_view(), name="add_friend"),
    path("chat_api/", test_chat_endpoint, name="test"),
    path("", api_routes, name="apis"),
]
