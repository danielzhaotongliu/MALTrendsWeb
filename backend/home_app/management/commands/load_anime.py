from django.core.management.base import BaseCommand
from datetime import datetime
import json
import glob
import sys
import os
import re


class Command(BaseCommand):
    help = 'Load MAL anime data into database based on .jl files'

    def handle(self, *args, **kwargs):
        __location__ = os.path.realpath(os.path.join(os.getcwd(), os.path.dirname(sys.argv[0])))
        # get the .jl files containing the snapshots of all anime
        data_path = __location__ + '/anime_data/*.jl'
        # loop through the snapshots for each anime
        for file_name in glob.glob(data_path):
            file_list = re.findall(r'snapshots_[0-9]+\.jl', file_name)
            assert len(file_list) == 1, 'ERROR: invalid path conventions'
            mal_id = int(re.findall(r'\d+', file_list[0])[0])
            self.stdout.write(f'{mal_id}')
        #     with open(file_name, 'r') as f:
        #         for line in f:
        #             snapshot = json.loads(line)
        #             time = datetime.utcfromtimestamp(snapshot['timestamp']).strftime('%Y-%m-%d %H:%M:%S')
        #             score = snapshot['score']