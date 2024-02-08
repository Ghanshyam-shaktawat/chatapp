from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _


class CustomUserModel(AbstractUser):
    email = models.EmailField(
        _("Your Email address"), unique=True, null=False, blank=False
    )


class FriendRequest(models.Model):
    STATUS_CHOICE = (
        ("pending", "Pending"),
        ("accepted", "Accepted"),
        ("rejected", "Rejected"),
    )
    from_user = models.ForeignKey(
        CustomUserModel, on_delete=models.CASCADE, related_name="request_receive"
    )
    to_user = models.ForeignKey(
        CustomUserModel, on_delete=models.CASCADE, related_name="request_sent"
    )
    status = models.CharField(max_length=20, choices=STATUS_CHOICE, default="pending")

    def __str__(self):
        return f"Request send from [ {self.from_user} ] to [ {self.to_user} ]"

    @classmethod
    def create_friend_req(cls, from_user, to_user):
        return cls.objects.create(
            from_user=from_user, to_user=to_user, status="pending"
        )
