import React from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View} from 'react-native';
import Video from 'react-native-video';
 
const {height, width} = Dimensions.get('screen');

const VideoPlayer = ({source, onPlay}) => {
  return (
    <View style={styles.container} key={source?.id}>
      <Video
        source={{uri: source?.url}}
        style={styles.video}
        resizeMode="contain"
        repeat
        paused={!onPlay}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  video: {
    width: '100%',
    height: height - 150,
  },
});

export default VideoPlayer;
