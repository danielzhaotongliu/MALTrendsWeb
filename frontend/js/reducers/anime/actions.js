export const SET_ANIME_SCORES = 'SET_ANIME_SCORES';
export const SET_SELECTED_ANIME = 'SET_SELECTED_ANIME';

export function setAnimeScores(animeScores) {
  return {
    type: SET_ANIME_SCORES,
    animeScores,
  };
}

export function setSelectedAnime(selectedId, selectedTitle) {
  return {
    type: SET_SELECTED_ANIME,
    selectedId,
    selectedTitle,
  };
}
