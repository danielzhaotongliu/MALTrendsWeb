from django.core.management.base import BaseCommand
from datetime import datetime
import time
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
                time.sleep(5)
                self.stdout.write(f'Created new anime: "{anime}" with mal_id: {mal_id}')
            else:
                self.stdout.write(f'Retrieved existing anime: "{anime}" with mal_id: {mal_id}')
            
            # with open(file_name, 'r') as f:
            #     for line in f:
            #         snapshot = json.loads(line)
            #         time = datetime.utcfromtimestamp(snapshot['timestamp']).strftime('%Y-%m-%d %H:%M:%S')
            #         score = snapshot['score']
            #         members = snapshot['score_count']
