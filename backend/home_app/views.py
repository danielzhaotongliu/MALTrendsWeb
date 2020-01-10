from django.shortcuts import get_object_or_404, render  # noqa
from django.http import HttpResponse, Http404
from rest_framework import viewsets
from rest_framework.response import Response

from .models import Anime, Score
from .serializers import AnimeSerializer, ScoreSerializer, AnimeListSerializer


def index(request):
    return HttpResponse('API root for searching a MAL anime entry')

def score(request, mal_id):
    anime = get_object_or_404(Anime, mal_id=mal_id)
    try:
        scores = anime.scores.all().values('score', 'date_time')
    except (KeyError, Score.DoesNotExist):
        raise Http404(f'Anime with MAL id: {mal_id} does not exist in the database')
    
    return HttpResponse(scores)


class AnimeViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint that allows anime to be viewed
    """
    queryset = Anime.objects.all()
    serializer_class = AnimeSerializer

    def list(self, request):
        anime_list_queryset = self.queryset.values('mal_id', 'title', 'title_english')
        serializer = AnimeListSerializer(anime_list_queryset, many=True)
        return Response(serializer.data)
