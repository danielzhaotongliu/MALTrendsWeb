from django.shortcuts import get_object_or_404, render  # noqa
from django.http import HttpResponse, Http404

from .models import Anime, Score

# Anime Search ViewSet
def index(request):
    return HttpResponse('API root for searching a MAL anime entry')

def score(request, mal_id):
    anime = get_object_or_404(Anime, mal_id=mal_id)
    try:
        scores = anime.score_set.all().values('score', 'date_time')
    except (KeyError, Score.DoesNotExist):
        raise Http404(f'Anime with MAL id: {mal_id} does not exist in the database')
    
    return HttpResponse(scores)
