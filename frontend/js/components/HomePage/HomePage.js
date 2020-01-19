import React from 'react';

// import css
import './HomePageStyle.css'

// importing axios
const axios = require('axios');

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        animeCount: null,
        scoreCount: null,
    };
  }

  async componentDidMount() {
    const response = await axios.get('/search/animes/count');
    const animeCount = response.data.animeCount;
    const scoreCount = response.data.scoreCount;
    this.setState({ animeCount, scoreCount });
  }

  render() {
    const { animeCount, scoreCount } = this.state;
    return (
      <div>
        <h2>Welcome to MALTrends!</h2>
        <h6>This website provides scores and popularity time series visualizations of animes on <a href="https://myanimelist.net/">MyAnimeList.</a></h6>
        {
            animeCount && scoreCount
            ? <p>Working with a total of {scoreCount} data points for {animeCount} animes.</p>
            : null
        }
      </div>
    );
  }
}

export default HomePage;