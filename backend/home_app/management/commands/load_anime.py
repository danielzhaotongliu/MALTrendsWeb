from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils.timezone import make_aware
from datetime import datetime
import time as t
import json
import glob
import sys
import os
import re
import requests

from home_app.models import Anime, Score


class Command(BaseCommand):
    help = 'Load MAL anime data into database based on .jl files'

    def handle(self, *args, **kwargs):
        __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(sys.argv[0])))
        # get the .jl files containing the snapshots of all anime
        data_path = __location__ + '/anime_data/*.jl'
        # loop through the snapshots for each anime
        for file_name in glob.glob(data_path):
            file_list = re.findall(r'snapshots_[0-9]+\.jl', file_name)
            # sanity check
            assert len(file_list) == 1, 'ERROR: invalid path conventions'
            mal_id = int(re.findall(r'\d+', file_list[0])[0])

            anime, created = Anime.objects.get_or_create(mal_id=mal_id)
            if created:
                # call MAL (unofficial) API endpoint to get anime info
                r = requests.get(f'https://api.jikan.moe/v3/anime/{mal_id}')
                r_data = r.json()
                # update the fields of the specified anime object
                anime.title = r_data['title']
                anime.title_english = r_data['title_english']
                anime.airing = r_data['airing']
                anime.url = r_data['url']
                anime.save()
                # add delay to not overload API
                t.sleep(5)
                self.stdout.write(f'Created new anime: "{anime}" with mal_id: {mal_id}')
            else:
                self.stdout.write(f'Retrieved existing anime: "{anime}" with mal_id: {mal_id}')
            
            existing_score_count = anime.scores.count()
            self.stdout.write(f'    There are {existing_score_count} existing scores associated with this anime')
            # TODO: less flexible as we need to delete all scores related to the specified anime before loading new ones
            anime.scores.all().delete()
            self.stdout.write(f'    There are {anime.scores.count()} scores after deletion, should be 0')

            score_objects = []
            with open(file_name, 'r') as f:
                for line in f:
                    # create a Score object based on each line (snapshot) in the file
                    snapshot = json.loads(line)
                    time = datetime.utcfromtimestamp(snapshot['timestamp'])
                    # make naive datetime objects aware of timezone info specified in django settings
                    time = make_aware(time)
                    score_object = Score(
                        score=snapshot['score'],
                        members=snapshot['score_count'],
                        date_time=time,
                        anime=anime)
                    score_objects.append(score_object)
            
            # bulk create the list of Score objects **associated with the specified anime**
            # in order to reduce the number of hits to the DB
            # NOTE: we are using the related name as defined in the schema (home_app.models)
            Score.objects.bulk_create(score_objects)
            new_score_count = anime.scores.count()
            self.stdout.write(f'    There are {new_score_count - existing_score_count} new scores added')
            self.stdout.write(f'    After loading, there are {new_score_count} scores associated this anime')