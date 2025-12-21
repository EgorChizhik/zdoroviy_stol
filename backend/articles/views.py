import random
from rest_framework import viewsets, filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from .models import Article, Category
from .serializers import ArticleListSerializer, ArticleDetailSerializer, CategorySerializer

class StandardPagination(PageNumberPagination):
    page_size = 9
    page_size_query_param = 'page_size'
    max_page_size = 30

class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    authentication_classes = []

class ArticleViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Article.objects.all()
    pagination_class = StandardPagination
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'short_description', 'content', 'tags']
    ordering_fields = ['created_at', 'likes', 'views']
    ordering = ['-created_at']
    permission_classes = [AllowAny]
    authentication_classes = []

  
    lookup_field = 'slug' 
    lookup_url_kwarg = 'slug'

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return ArticleDetailSerializer
        return ArticleListSerializer

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.views += random.randint(5, 50)
        instance.save(update_fields=['views'])
        return super().retrieve(request, *args, **kwargs)

    def get_queryset(self):
        queryset = Article.objects.all()
        category_slug = self.request.query_params.get('category')
        if category_slug:
            queryset = queryset.filter(category__slug=category_slug)
        return queryset