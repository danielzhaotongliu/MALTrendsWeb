from __future__ import unicode_literals

from django.db import models  # noqa


class Anime(models.Model):
    mal_id = models.IntegerField(primary_key=True)
    url = models.URLField()


class Score(models.Model):
    score = models.FloatField()
    date_time = models.DateTimeField()
    # foreign key vs many to many