from django.urls import path

from . import views

urlpatterns = [
    # ex: /search/
    path('', views.index, name='index'),
    # ex: /search/32281/
    path('<int:mal_id>/', views.score, name='score')
]