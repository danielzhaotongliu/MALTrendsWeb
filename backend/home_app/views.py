from django.shortcuts import get_object_or_404, render  # noqa
from django.http import HttpResponse, Http404
from rest_framework import viewsets

from .models import Anime, Score
from .serializers import AnimeSerializer, ScoreSerializer


def index(request):
    return HttpResponse('API root for searching a MAL anime entry')

def score(request, mal_id):
    anime = get_object_or_404(Anime, mal_id=mal_id)
    try:
        scores = anime.scores.all().values('score', 'date_time')
    except (KeyError, Score.DoesNotExist):
        raise Http404(f'Anime with MAL id: {mal_id} does not exist in the database')
    
    return HttpResponse(scores)


class AnimeViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows anime to be viewed
    """
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer
