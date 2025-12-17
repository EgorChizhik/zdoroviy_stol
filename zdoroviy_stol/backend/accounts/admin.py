
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.html import format_html
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import User


@admin.register(User)
class UserAdmin(ModelAdmin, BaseUserAdmin):
    list_display = ('avatar_thumb', 'username', 'nickname', 'email', 'phone', 'is_staff')
    list_filter = ('is_staff', 'is_superuser', 'gender', 'date_joined')
    search_fields = ('username', 'nickname', 'email', 'phone', 'first_name', 'last_name')
    ordering = ('-date_joined',)

    fieldsets = (
        ('Основное', {
            'fields': ('username', 'password')
        }),
        ('Личная информация', {
            'fields': ('nickname', 'first_name', 'last_name', 'patronymic', 'gender', 'email', 'phone')
        }),
        ('Изображения', {
            'fields': ('avatar_thumb', 'banner_thumb'),
        }),
        ('О себе', {
            'fields': ('bio',),
        }),
        ('Права', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
        }),
        ('Даты', {
            'fields': ('last_login', 'date_joined'),
            'classes': ('collapse',),
        }),
    )

    add_fieldsets = (
        (None, {
            'fields': ('username', 'password1', 'password2'),
        }),
        ('Личная информация', {
            'fields': ('nickname', 'first_name', 'last_name', 'email', 'phone', 'gender'),
        }),
    )

    readonly_fields = ('avatar_thumb', 'banner_thumb', 'last_login', 'date_joined')

    @display(description="Аватар", ordering="avatar")
    def avatar_thumb(self, obj):
        if obj.avatar:
            return format_html(
                '<img src="{}" style="width: 60px; height: 60px; border-radius: 50%; object-fit: cover;" />',
                obj.avatar.url
            )
        return "—"

    @display(description="Баннер", ordering="banner")
    def banner_thumb(self, obj):
        if obj.banner:
            return format_html(
                '<img src="{}" style="width: 150px; height: 60px; object-fit: cover; border-radius: 8px;" />',
                obj.banner.url
            )
        return "—"