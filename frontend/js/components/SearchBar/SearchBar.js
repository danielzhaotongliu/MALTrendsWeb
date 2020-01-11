import React from 'react';
import { AutoComplete } from 'antd';

// importing axios
const axios = require('axios');

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      animes: [],
    };
  }

  async componentDidMount() {
    try {
      if (this.state.animes.length === 0) {
        const response = await axios.get('/search/animes');
        const animes = Object.values(response.data).map(anime => anime['title_english']);
        this.setState({ animes });
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <AutoComplete
        dataSource={this.state.animes}
        filterOption={(inputValue, option) =>
          option.props.children.toUpperCase().includes(inputValue.toUpperCase())
        }
        placeholder="Search..."
      />
    );
  }
}

export default SearchBar;
