from django.http import JsonResponse, Http404
from django.middleware.csrf import get_token
from django.shortcuts import redirect, get_object_or_404
from django.utils import timezone
from .models import ShortenedUrl, View
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import json

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def shorten_url(request):
    data = json.loads(request.body)
    original_url = data.get('url', '')
    title = data.get('title', '')

    if original_url == '':
        return JsonResponse({"error":"URL is required"}, status=400)

    ShortenedUrl.objects.create(original_url=original_url, user=request.user, title=title)
    return JsonResponse({"message":"success"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def list_urls(request):
    urls = request.user.shortened_urls.all()
    urls_data = []
    for url in urls:
        urls_data.append({
            'id': url.id,
            'title': url.title,
            'original_url': url.original_url,
            'short_id': url.short_id,
            'count': url.views.count()
        })
    return JsonResponse({'urls': urls_data})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def detailed_url_view(request, short_id):
    try:
        shortened_url = ShortenedUrl.objects.get(short_id=short_id, user=request.user)

        views = shortened_url.views.all().values(
            'id',
            'viewed_at',
            'ip_address'
        )

        return JsonResponse({
            'id': shortened_url.id,
            'title': shortened_url.title,
            'original_url': shortened_url.original_url,
            'short_id': shortened_url.short_id,
            'views': list(views)
        })
    except ShortenedUrl.DoesNotExist:
        return JsonResponse({'error': 'URL not found'}, status=404)


@api_view(['GET'])
def redirect_url(request, short_id):
    try:
        shortened_url = get_object_or_404(ShortenedUrl, short_id=short_id)
        View.objects.create(shortened_url=shortened_url, viewed_at=timezone.now(), ip_address=request.META.get('REMOTE_ADDR'))
        return redirect(shortened_url.original_url)
    except ShortenedUrl.DoesNotExist:
        raise Http404('URL not found')

@api_view(['GET'])
def csrf(request):
    return JsonResponse({'csrfToken': get_token(request)})