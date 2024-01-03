from django.contrib import admin
from .models import CustomUserModel
from django.contrib.auth.admin import UserAdmin

# Register your models here.
admin.site.register(CustomUserModel, UserAdmin)