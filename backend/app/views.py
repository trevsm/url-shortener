from django.http import JsonResponse
from django.middleware.csrf import get_token
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.shortcuts import redirect
from .models import ShortenedUrl
import json

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def shorten_url(request):
    data = json.loads(request.body)
    original_url = data.get('url', '')

    ShortenedUrl.objects.create(original_url=original_url, user=request.user)
    return JsonResponse({"message":"success"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_urls(request):
    urls = request.user.shortened_urls.all()
    return JsonResponse({'urls': list(urls.values('id', 'original_url', 'short_id', 'count'))})

@api_view(['GET'])
def redirect_url(request, short_id):
    try:
        obj = ShortenedUrl.objects.get(short_id=short_id)
        ShortenedUrl.objects.filter(short_id=short_id).update(count=obj.count + 1)

        return redirect(obj.original_url)
    except ShortenedUrl.DoesNotExist:
        raise Http404('URL not found')

@api_view(['GET'])
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})