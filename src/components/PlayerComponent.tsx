import React, {useRef, useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  LayoutRectangle,
} from 'react-native';
import Orientation from 'react-native-orientation';
import {VLCPlayer} from 'react-native-vlc-media-player';
import Slider from '@react-native-community/slider';
import {Validate} from '../utils/Validate';
import {appInfo} from '../constants/appInfo';
import {
  MessageText1,
  Pause,
  Play,
  Size,
  VoiceCricle,
} from 'iconsax-react-native';
import RowComponent from './RowComponent';

interface PlayerProps {
  title: string;
  subTitle: string;
  url: string;
  poster?: string;
}

const PlayerComponent = (props: PlayerProps) => {
  const {url} = props;

  const vlcPlayerRef = useRef<VLCPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [resizeMode, setResizeMode] = useState<
    'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  >('contain');

  useEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      Orientation.unlockAllOrientations();
    };
  }, []);

  useEffect(() => {}, []);

  const onPlaying = (event: any) => {
    setCurrentTime(event.currentTime);
    setDuration(event.duration);
    setPosition(event.position);
  };

  const onPaused = () => {
    setIsPlaying(false);
  };

  const onPlayPauseToggle = () => {
    setIsPlaying(prev => !prev);
  };

  const onProgress = (event: any) => {
    setCurrentTime(event.currentTime);
    setDuration(event.duration);
    setPosition(event.position);
  };

  const onSeek = (value: number) => {
    if (
      vlcPlayerRef.current &&
      typeof vlcPlayerRef.current.seek === 'function'
    ) {
      vlcPlayerRef.current.seek(value);
      setCurrentTime(value);
    }
  };

  const handleSliderChange = (value: number) => {
    const event = {
      currentTime: value,
      duration: duration,
      position: value / duration,
      remainingTime: value - duration,
      target: 3,
    };
    onProgress(event);
  };

  const toggleResizeMode = () => {
    switch (resizeMode) {
      case 'fill':
        setResizeMode('contain');
        break;
      case 'contain':
        setResizeMode('cover');
        break;
      case 'cover':
        setResizeMode('none');
        break;
      case 'none':
        setResizeMode('scale-down');
        break;
      case 'scale-down':
        setResizeMode('fill');
        break;
      default:
        setResizeMode('contain');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <VLCPlayer
        ref={vlcPlayerRef}
        style={[styles.video]}
        videoAspectRatio="16:9"
        source={{uri: url}}
        paused={!isPlaying}
        onPlaying={onPlaying}
        onPaused={onPaused}
        onProgress={onProgress}
        resizeMode={resizeMode}
      />

      {/* Slider */}
      <View
        style={[
          styles.controls,
          {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 0,
            backgroundColor: '#000',
            flex: 1,
          },
        ]}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onValueChange={handleSliderChange}
          onSlidingComplete={onSeek}
        />
      </View>

      {/* Controls button */}
      <RowComponent
        styles={[
          styles.controls,
          {gap: 8, width: '95%', backgroundColor: 'rgba(0,0,0,0)'},
        ]}>
        <RowComponent
          styles={[
            styles.controls,
            {
              flex: 1,
              justifyContent: 'flex-start',
              gap: 8,
              backgroundColor: 'rgba(0,0,0,0)',
            },
          ]}>
          <TouchableOpacity onPress={onPlayPauseToggle}>
            {isPlaying ? (
              <Pause size="32" color="#FF8A65" />
            ) : (
              <Play size="32" color="#FF8A65" />
            )}
          </TouchableOpacity>
          <Text style={{color: 'white'}}>{`${Validate.millisecondsToTime(
            currentTime,
          )}/${Validate.millisecondsToTime(duration)}`}</Text>
        </RowComponent>

        <RowComponent
          styles={[
            styles.controls,
            {
              flex: 1,
              justifyContent: 'flex-end',
              gap: 8,
              backgroundColor: 'rgba(0,0,0,0)',
            },
          ]}>
          <TouchableOpacity>
            <MessageText1 size="32" color="#FF8A65" />
          </TouchableOpacity>
          <TouchableOpacity>
            <VoiceCricle size="32" color="#FF8A65" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleResizeMode}>
            <Size size="32" color="#FF8A65" />
          </TouchableOpacity>
        </RowComponent>
      </RowComponent>

      {/* Info */}
      <View
        style={{
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'red',
          }}>{`Current Time: ${Validate.millisecondsToTime(
          currentTime,
        )}`}</Text>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'red',
          }}>{`Duration: ${Validate.millisecondsToTime(duration)}`}</Text>
        <Text style={{color: 'white', backgroundColor: 'red'}}>{`Position: ${(
          position * 100
        ).toFixed(2)}%`}</Text>
        <Text
          style={{
            color: 'white',
            backgroundColor: 'red',
          }}>{`Resize: ${resizeMode}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
  },
  video: {
    width: appInfo.sizes.WIDTH,
    height: appInfo.sizes.HEIGHT * 0.9,
  },
  controls: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 10,
    backgroundColor: '#000',
  },
  slider: {
    flex: 1,
  },
});

export default PlayerComponent;
