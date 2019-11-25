from django.shortcuts import render  # noqa
from django.http import HttpResponse


# Anime Search ViewSet
def search(request):
    return HttpResponse('Search for anime scores')
