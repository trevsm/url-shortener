from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.shortcuts import redirect
from .models import ShortenedUrl
import json

def shorten_url(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        original_url = data.get('url', '')

        ShortenedUrl.objects.create(original_url=original_url)
        return JsonResponse({"message":"success"})

def list_urls(request):
    urls = ShortenedUrl.objects.all()
    return JsonResponse({'urls': list(urls.values())})

def redirect_url(request, short_id):
    try:
        obj = ShortenedUrl.objects.get(short_id=short_id)
        ShortenedUrl.objects.filter(short_id=short_id).update(count=obj.count + 1)

        return redirect(obj.original_url)
    except ShortenedUrl.DoesNotExist:
        raise Http404('URL not found')

def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})