from traceback import format_tb
from django.contrib import admin
from unfold.admin import ModelAdmin
from unfold.decorators import display
from .models import Article, Category

@admin.register(Category)
class CategoryAdmin(ModelAdmin):
    list_display = ['name', 'slug']
    search_fields = ['name']
    prepopulated_fields = {"slug": ("name",)}

@admin.register(Article)
class ArticleAdmin(ModelAdmin):
    list_display = ['title', 'category', 'author', 'created_at', 'likes', 'views']
    list_filter = ['category', 'created_at']
    search_fields = ['title', 'short_description']
    prepopulated_fields = {"slug": ("title",)}
    readonly_fields = ['likes', 'views', 'created_at', 'updated_at']

    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'category', 'tags', 'author')
        }),
        ('Контент', {
            'fields': ('short_description', 'content', 'main_image')
        }),
        ('Статистика (авто)', {
            'fields': ('created_at', 'updated_at', 'likes', 'views'),
            'classes': ('collapse',)
        }),
    )

    @display(description="Превью")
    def preview_image(self, obj):
        if obj.main_image:
            return format_tb('<img src="{}" style="height: 100px; border-radius: 8px;" />', obj.main_image.url)
        return "-"