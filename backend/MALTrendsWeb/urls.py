from django.conf.urls import include, url  # noqa
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import include, path

import django_js_reverse.views
import home_app.views


urlpatterns = [
    path('search/', include('home_app.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^jsreverse/$', django_js_reverse.views.urls_js, name='js_reverse'),

    url(r'^$', TemplateView.as_view(template_name='home_app/home.html'), name='home'),
]
