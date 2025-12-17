from django.db import models
from django.contrib.auth import get_user_model
from django.utils import timezone
import random
from ckeditor_uploader.fields import RichTextUploadingField

User = get_user_model()

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True, verbose_name="Название категории")
    slug = models.SlugField(max_length=60, unique=True, verbose_name="Slug (для URL)")

    class Meta:
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.name

class Article(models.Model):
    title = models.CharField(max_length=200, verbose_name="Заголовок")
    slug = models.SlugField(max_length=220, unique=True, verbose_name="Slug")
    short_description = models.TextField(max_length=500, verbose_name="Краткое описание (тизер)")
    content = RichTextUploadingField(verbose_name="Полный текст статьи (с форматированием)")
    main_image = models.ImageField(upload_to='articles/main/', verbose_name="Главное фото")

    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True, verbose_name="Категория")
    tags = models.CharField(max_length=300, blank=True, verbose_name="Теги (через запятую)")

    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, verbose_name="Автор")
    created_at = models.DateTimeField(default=timezone.now, verbose_name="Дата создания")
    updated_at = models.DateTimeField(auto_now=True)

    
    likes = models.PositiveIntegerField(default=0)
    views = models.PositiveIntegerField(default=0)

    def save(self, *args, **kwargs):
        if not self.id: 
            self.likes = random.randint(10, 5000)
            self.views = random.randint(50, 10000)
        super().save(*args, **kwargs)

    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]

    class Meta:
        ordering = ['-created_at']
        verbose_name = "Статья"
        verbose_name_plural = "Статьи"

    def __str__(self):
        return self.title