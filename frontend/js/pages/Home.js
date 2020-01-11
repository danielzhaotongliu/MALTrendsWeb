import React, { useState } from 'react';

import LayoutAnt from '../components/LayoutAnt/LayoutAnt';

const Home = () => {
  const [showBugComponent, setShowBugComponent] = useState(false);

  return <LayoutAnt className="main-container" />;
};

export default Home;
