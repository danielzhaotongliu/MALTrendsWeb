from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import include, path
from rest_framework import routers

import django_js_reverse.views
import home_app.views
from home_app import views


router = routers.DefaultRouter()
router.register(r'animes', views.AnimeViewSet, basename='Anime')

urlpatterns = [
    path(r'default-search/', include('home_app.urls')),  # default search using vanilla django views
    path(r'search/', include(router.urls)),              # search using DRF
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^$', TemplateView.as_view(template_name='home_app/home.html'), name='home'),
]
