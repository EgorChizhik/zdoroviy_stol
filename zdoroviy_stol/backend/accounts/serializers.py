from rest_framework import serializers
from .models import User
import re


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'username', 'nickname', 'first_name', 'last_name', 'patronymic',
            'gender', 'email', 'phone', 'password'
        ]
        extra_kwargs = {
            'password': {'write_only': True},
            'email': {'required': True},
            'phone': {'required': True},
        }

    def validate_username(self, value):
        if len(value) < 3:
            raise serializers.ValidationError("Логин должен быть не менее 3 символов")
        if not re.match(r'^[a-zA-Z0-9_]+$', value):
            raise serializers.ValidationError("Логин: только латиница, цифры и подчёркивание")
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Этот логин уже занят")
        return value

    def validate_nickname(self, value):
        if len(value) > 50:
            raise serializers.ValidationError("Никнейм не больше 50 символов")
        if User.objects.filter(nickname=value).exists():
            raise serializers.ValidationError("Этот никнейм уже занят")
        return value

    def validate_first_name(self, value):
        if not re.match(r'^[А-ЯЁа-яё\-\s]+$', value.strip()):
            raise serializers.ValidationError("Имя: только русские буквы, дефис и пробел")
        return value.strip()

    def validate_last_name(self, value):
        if not re.match(r'^[А-ЯЁа-яё\-\s]+$', value.strip()):
            raise serializers.ValidationError("Фамилия: только русские буквы, дефис и пробел")
        return value.strip()

    def validate_patronymic(self, value):
        if value and not re.match(r'^[А-ЯЁа-яё\-\s]+$', value.strip()):
            raise serializers.ValidationError("Отчество: только русские буквы, дефис и пробел")
        return value.strip() if value else ''

    def validate_email(self, value):
        if not value:
            raise serializers.ValidationError("Email обязателен")
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Этот email уже зарегистрирован")
      
        if '@' not in value or '.' not in value.split('@')[-1]:
            raise serializers.ValidationError("Введите корректный email")
        return value

    def validate_phone(self, value):

        clean = re.sub(r'\D', '', value)
        
        if not clean.startswith('7') or len(clean) != 11:
            raise serializers.ValidationError("Телефон должен быть в формате +7 (999) 999-99-99")
        
        if User.objects.filter(phone=clean).exists():
            raise serializers.ValidationError("Этот номер уже зарегистрирован")
        
        return clean  

    def validate_password(self, value):
        if len(value) < 6:
            raise serializers.ValidationError("Пароль должен быть не менее 6 символов")
        return value

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['nickname', 'first_name', 'last_name', 'email', 'phone', 'avatar', 'banner', 'bio']
        read_only_fields = ['first_name', 'last_name', 'email', 'phone']