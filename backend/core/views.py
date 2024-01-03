from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import CreateAPIView
from django.contrib.auth import get_user_model

User = get_user_model()

class TestAPI(APIView):
    permission_classes = (IsAuthenticated,) 

    def get(self, request):
        content = {'message': 'Welcome to JWT Authentication page!'}
        return Response(content)
    
@api_view(['GET'])
def get_routes(request):
    routes = [
        'api/token/',
        'api/token/refresh/',
        'api/home/',
    ]
    return Response(routes)

class RegisterView():
    pass