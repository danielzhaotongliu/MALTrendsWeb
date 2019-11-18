import React, { useState } from 'react';

import { ColorChanger } from '../app/example-app';
import SearchBar from '../app/example-app/components/SearchBar';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      <ColorChanger title={title} />
      <SearchBar />
    </>
  );
};

export default Home;
