import React, {useEffect, useState} from 'react';

import SplashScreen from './SplashScreen';

import Home from '../screens/Home/Home';

const Navigators = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  });

  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <Home />
      )}
      </>
  );
};

export default Navigators;
