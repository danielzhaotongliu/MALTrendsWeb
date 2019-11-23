import React, { useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import SideBar from '../components/SideBar/SideBar';
import SideBarAntD from '../components/SideBar/SideBarAntD';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* <SearchBar className="main-container" /> */}
      <SideBarAntD />
    </>
  );
};

export default Home;
