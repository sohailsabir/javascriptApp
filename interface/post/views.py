from django.shortcuts import render
from django.core.paginator import Paginator
from django.http import JsonResponse
from django.views.decorators.http import require_GET
from .models import Post

@require_GET
def index(request):
    posts = Post.objects.all().order_by('-date_posted')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    return render(request, 'post/index.html', {'page_obj': page_obj})

@require_GET
def load_more_posts(request):
    posts = Post.objects.all().order_by('-date_posted')
    paginator = Paginator(posts, 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)
    data = {
        'posts': [],
        'has_next': page_obj.has_next()
    }
    for post in page_obj:
        data['posts'].append({
            'title': post.title,
            'content': post.content,
            'date_posted': post.date_posted.strftime('%Y-%m-%d %H:%M:%S')
        })
    return JsonResponse(data)
