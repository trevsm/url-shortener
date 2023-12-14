from django.contrib import admin
from django.urls import path
from app.views import shorten_url, redirect_url, list_urls, csrf, detailed_url_view, update_url, delete_url
from users.views import login, register, profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('s/<str:short_id>/', redirect_url, name='redirect_url'),
    path('api/shorten/', shorten_url, name='shorten_url'),
    path('api/urls/', list_urls, name='list_urls'),
    path('api/url/<str:short_id>/', detailed_url_view, name='detailed_url_view'),
    path('api/url/<str:short_id>/update/', update_url, name='update_url'),
    path('api/url/<str:short_id>/delete/', delete_url, name='delete_url'),
    path('api/csrf/', csrf, name='csrf'),
    path('api/login/', login, name='login'),
    path('api/register/', register, name='register'),
    path('api/profile/', profile, name='profile'),
]
