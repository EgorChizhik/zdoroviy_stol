from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import RegexValidator

class User(AbstractUser):
    username = models.CharField(
        max_length=30,
        unique=True,
        validators=[RegexValidator(r'^[a-zA-Z0-9_]+$')],
        verbose_name='Логин (только латиница)'
    )
    nickname = models.CharField(max_length=50, unique=True, verbose_name='Никнейм')
    first_name = models.CharField(max_length=30, validators=[RegexValidator(r'^[А-ЯЁа-яё]+$')], verbose_name='Имя')
    last_name = models.CharField(max_length=30, validators=[RegexValidator(r'^[А-ЯЁа-яё]+$')], verbose_name='Фамилия')
    patronymic = models.CharField(max_length=30, blank=True, null=True, validators=[RegexValidator(r'^[А-ЯЁа-яё]+$')], verbose_name='Отчество')
    
    GENDER_CHOICES = (
        ('M', 'Мужской'),
        ('F', 'Женский'),
        ('N', 'Не указан'),
    )
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, default='N', verbose_name='Пол')
    
    email = models.EmailField(unique=True, verbose_name='Email')
    phone = models.CharField( unique=True, verbose_name='Телефон')
    
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    banner = models.ImageField(upload_to='banners/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True, verbose_name='О себе')

    def __str__(self):
        return self.nickname or self.username