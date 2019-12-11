import time

def serialize_anime(anime):
    return {
        "mal_id": anime.mal_id,
        "title": anime.title,
        "title_english": anime.title_english,
        "airing": anime.airing,
        "url": anime.url,
        "scores": list(anime.scores.all().values()),
    }

# get the first anime
anime = Anime.objects.get(mal_id=1)

# get start time
start = time.time()


for i in range(10000):
    # AnimeSerializer(anime).data
    # DRFS(anime).data
    serialize_anime(anime)

# calculate execution time
print(time.time() - start)
