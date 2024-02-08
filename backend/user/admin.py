from django.contrib import admin
from .models import CustomUserModel, FriendRequest
from django.contrib.auth.admin import UserAdmin

admin.site.register(CustomUserModel, UserAdmin)
admin.site.register(FriendRequest)
