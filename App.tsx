import React from 'react';
import PlayerComponent from './src/components/PlayerComponent';
import PLayerCpn from './src/components/Player';
import {Text, View} from 'react-native';

const App = () => {
  return (
    <>
      <PlayerComponent
        title={'Test'}
        subTitle={'test'}
        url={'http://sv1.vnshare.xyz:8585/movies?id=5HNMWDSNJKUE43TN'}
      />
      {/* <PLayerCpn
        title={'Test'}
        subTitle={'test'}
        url={'http://sv1.vnshare.xyz:8585/movies?id=5HNMWDSNJKUE43TN'}
      /> */}
    </>
  );
};

export default App;
