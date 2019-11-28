from __future__ import unicode_literals

from django.db import models  # noqa


class Anime(models.Model):
    mal_id = models.IntegerField(primary_key=True)
    title = models.CharField(max_length=300)
    title_english = models.CharField(max_length=300, blank=True)
    airing = models.BooleanField(default=False)
    url = models.URLField()

    def __str__(self):
        return self.title


class Score(models.Model):
    score = models.FloatField()
    date_time = models.DateTimeField()
    anime = models.ForeignKey(Anime, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.score)
