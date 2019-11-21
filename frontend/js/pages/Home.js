import React, { useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import SideBar from '../components/SideBar/SideBar';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      <SearchBar className="main-container" />
      <SideBar />
    </>
  );
};

export default Home;
