from django.http import JsonResponse
from django.middleware.csrf import get_token
from .models import Counter

def get_count(request):
    counter, created = Counter.objects.get_or_create(pk=1)
    if request.method == 'POST':
        counter.count += 1
        counter.save()
    return JsonResponse({'count': counter.count})

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})