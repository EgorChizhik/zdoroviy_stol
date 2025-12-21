from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.contrib.auth import authenticate

from .models import User
from .serializers import RegisterSerializer

from rest_framework_simplejwt.tokens import RefreshToken


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({
                "message": "Пользователь успешно создан!",
                "nickname": user.nickname
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'nickname': user.nickname,
                }
            })
        return Response({"error": "Неверный логин или пароль"}, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        data = {
            "id": user.id,
            "nickname": user.nickname,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "avatar": user.avatar.url if user.avatar else None,
            "banner": user.banner.url if user.banner else None,
            "bio": user.bio or "",
        }
        return Response(data)

    def patch(self, request):
        user = request.user
        allowed_fields = ['nickname', 'bio', 'avatar', 'banner']

        for field in allowed_fields:
            if field in request.data:
                if field in ['avatar', 'banner']:
                    setattr(user, field, request.FILES.get(field))
                else:
                    setattr(user, field, request.data[field])

        user.save()
      
        return Response({
            "id": user.id,
            "nickname": user.nickname,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "phone": user.phone,
            "avatar": user.avatar.url if user.avatar else None,
            "banner": user.banner.url if user.banner else None,
            "bio": user.bio or "",
        })