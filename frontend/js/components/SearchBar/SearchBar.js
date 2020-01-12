import React from 'react';
import { AutoComplete } from 'antd';

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
      const response = await axios.get(`/search/animes/${mal_id}`);
      // TODO: handle response by storing to Redux state
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

export default SearchBar;
