from django.contrib import admin
from django.urls import path
from app.views import shorten_url, redirect_url, list_urls, csrf

urlpatterns = [
    path('admin/', admin.site.urls),
    path('s/<str:short_id>/', redirect_url, name='redirect_url'),
    path('api/shorten/', shorten_url, name='shorten_url'),
    path('api/list/', list_urls, name='list_urls'),
    path('api/csrf/', csrf),
]
