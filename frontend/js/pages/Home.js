import React, { useState } from 'react';

import SearchBar from '../components/SearchBar/SearchBar';
import SideBar from '../components/SideBar/SideBar';
import SideBarAnt from '../components/SideBarAnt/SideBarAnt';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      {/* <SideBar className="main-container" /> */}
      <SideBarAnt className="main-container" />
    </>
  );
};

export default Home;
