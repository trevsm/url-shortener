from django.contrib import admin
from django.urls import path
from app.views import shorten_url, redirect_url, list_urls, csrf
from users.views import login, register, profile

urlpatterns = [
    path('admin/', admin.site.urls),
    path('s/<str:short_id>/', redirect_url, name='redirect_url'),
    path('api/shorten/', shorten_url, name='shorten_url'),
    path('api/list/', list_urls, name='list_urls'),
    path('api/csrf/', csrf, name='csrf'),
    path('api/login/', login, name='login'),
    path('api/register/', register, name='register'),
    path('api/profile/', profile, name='profile'),
]
