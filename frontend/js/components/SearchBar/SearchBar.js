import React from 'react';
import { AutoComplete } from 'antd';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  setAnimeScores,
  setSelectedAnime,
} from '../../reducers/anime/actions';

// importing axios
const axios = require('axios');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
      animeTitles: [],
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  async handleSelect(title) {
    try {
      const mal_id = this.state.animes[title];
      if (!(mal_id in this.props.scores)) {
        // fetch data from backend API
        const response = await axios.get(`/search/animes/${mal_id}`);
        // update anime scores in Redux state
        this.props.setAnimeScores(response.data);
      }
      // update the selected anime's MAL id and title in Redux state
      this.props.setSelectedAnime(mal_id, title);
    } catch (error) {
      console.log(error);
    }
  }
  
  async componentDidMount() {
    try {
      if (this.state.animes.length === 0) {
        const response = await axios.get('/search/animes');
        const animes = response.data.reduce((obj, anime) =>
          (obj[anime.title_english] = anime.mal_id, obj), {});
        const animeTitles = response.data.map(anime => anime['title_english']);
        this.setState({ animes, animeTitles });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <AutoComplete
        dataSource={this.state.animeTitles}
        filterOption={(inputValue, option) =>
          option.props.children.toUpperCase().includes(inputValue.toUpperCase())
        }
        placeholder="Search..."
        onSelect={this.handleSelect}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    scores: state.anime.scores
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setAnimeScores,
    setSelectedAnime
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
