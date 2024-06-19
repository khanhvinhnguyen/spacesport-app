import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {VLCPlayer} from 'react-native-vlc-media-player';

interface PlayerProps {
  title: string;
  subTitle: string;
  url: string;
  poster?: string;
}

const calcVLCPlayerHeight = (windowWidth: number, aspetRatio: number) => {
  return windowWidth * aspetRatio;
};

const PLayerCpn = (props: PlayerProps) => {
  const {url} = props;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <VLCPlayer
              source={{
                uri: url,
              }}
              autoAspectRatio={true}
              resizeMode="cover"
              // videoAspectRatio={"4:3"}
              style={{
                height: calcVLCPlayerHeight(
                  Dimensions.get('window').width,
                  3 / 4,
                ),
                marginTop: 30,
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  heading: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.black,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default PLayerCpn;
