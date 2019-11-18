import React, { useState } from 'react';

import { ColorChanger, SearchBar } from '../app/example-app';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
    <>
      <ColorChanger title={title} />
    </>
  );
};

export default Home;
