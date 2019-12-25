import serpy

# serpy custom field for Python DateTime objects
class SerpyDateTimeField(serpy.Field):
    def to_value(self, date_time):
        return date_time.isoformat(timespec='seconds')


class ScoreSerializer(serpy.Serializer):
    id = serpy.IntField()
    score = serpy.FloatField()
    date_time = SerpyDateTimeField()


class AnimeSerializer(serpy.Serializer):
    mal_id = serpy.IntField()
    title = serpy.StrField()
    title_english = serpy.StrField()
    airing = serpy.BoolField()
    # in Django a URLField is a CharField with validation
    url = serpy.StrField()
    # TODO: need to test line below
    scores = ScoreSerializer(many=True, attr='scores.all', call=True)
