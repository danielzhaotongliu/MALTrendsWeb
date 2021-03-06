from rest_framework import serializers
import time

from .models import Anime, Score

# class ScoreSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Score
#         fields = '__all__'
#         # read_only_fields = fields

# class AnimeSerializer(serializers.ModelSerializer):
#     scores = ScoreSerializer(many=True, read_only=True)

#     class Meta:
#         model = Anime
#         fields = '__all__'
#         # fields = ['mal_id', 'title_english', 'score']
#         # exclude = ['airing']
#         # read_only_fields = fields

class TimestampField(serializers.Field):
    def to_representation(self, value):
        # Javascript timestamp is 13 digits while in Python, it is 10 digits
        return int(time.mktime(value.timetuple())) * 1000


class ScoreSerializer(serializers.Serializer):
    score = serializers.FloatField()
    members = serializers.IntegerField()
    date_time = serializers.DateTimeField()
    # NOTE: later if switching to timestamp implementation, uncomment code below
    # date_time = TimestampField()


class AnimeSerializer(serializers.Serializer):
    mal_id = serializers.IntegerField()
    title = serializers.CharField()
    title_english = serializers.CharField()
    airing = serializers.BooleanField()
    url = serializers.URLField()
    scores = ScoreSerializer(many=True, read_only=True)


class AnimeListSerializer(serializers.Serializer):
    mal_id = serializers.IntegerField()
    title = serializers.CharField()
    title_english = serializers.CharField()
