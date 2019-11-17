import React, { useState } from 'react';

import ColorChanger from '../app/example-app';

const title = 'MyAnimeList score progression over time';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return (
      <ColorChanger title={title} />
  );
};

export default Home;
