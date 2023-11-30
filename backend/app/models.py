from django.db import models
from django.contrib.auth.models import User
import string
import random

def generate_short_id():
    length = 6
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

class ShortenedUrl(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shortened_urls')
    original_url = models.URLField()
    short_id = models.CharField(max_length=6, unique=True, default=generate_short_id)

    def __str__(self):
        return f'{self.short_id}: {self.original_url}'

class View(models.Model):
    shortened_url = models.ForeignKey(ShortenedUrl, on_delete=models.CASCADE, related_name='views')
    viewed_at = models.DateTimeField(auto_now_add=True)
