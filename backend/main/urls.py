from django.contrib import admin
from django.urls import path
from app.views import get_count, csrf

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/counter/', get_count),
    path('api/csrf/', csrf),
]
