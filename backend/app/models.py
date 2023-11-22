from django.db import models
import string
import random

def generate_short_id():
    length = 6
    characters = string.ascii_letters + string.digits
    return ''.join(random.choice(characters) for _ in range(length))

class ShortenedUrl(models.Model):
    original_url = models.URLField()
    short_id = models.CharField(max_length=6, unique=True, default=generate_short_id)
    count = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.short_id}: {self.original_url}'
