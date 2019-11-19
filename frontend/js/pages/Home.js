import React, { useState } from 'react';

import SearchBar from '../components/SearchBar';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      <SearchBar className="main-container" />
    </>
  );
};

export default Home;
