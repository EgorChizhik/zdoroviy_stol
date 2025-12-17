from rest_framework import serializers
from .models import Article, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']

class ArticleListSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(), source='category', write_only=True, required=False
    )
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'slug', 'short_description', 'main_image','created_at', 'likes', 'views', 'category', 'category_id', 'tags_list']

    def get_tags_list(self, obj):
        return obj.get_tags_list()

class ArticleDetailSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    tags_list = serializers.SerializerMethodField()

    class Meta:
        model = Article
        fields = ['id', 'title', 'short_description', 'content', 'main_image', 'created_at', 'likes', 'views', 'category', 'tags_list', 'author']

    def get_tags_list(self, obj):
        return obj.get_tags_list()