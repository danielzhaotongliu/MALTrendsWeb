import {
  SET_ANIME_SCORES,
  SET_SELECTED_ANIME,
} from './actions';

const initState = {
  scores: {},
  selectedId: null,
  selectedTitle: null,
};

const animeReducer = (state = initState, action) => {
  switch (action.type) {
    case SET_ANIME_SCORES:
      return {
        ...state,
        scores: {
          ...state.scores, 
          [action.animeScores.mal_id]: action.animeScores.scores
        }
      };
    case SET_SELECTED_ANIME:
      return {
        ...state,
        selectedId: action.selectedId,
        selectedTitle: action.selectedTitle
      }
    default:
      return state;
  }
};

export default animeReducer;
