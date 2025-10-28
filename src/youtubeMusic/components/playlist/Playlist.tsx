import {
  Animated,
  Image,
  PanResponder,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import PlaylistMini from './PlaylistMini';
import { useRef } from 'react';

interface PlaylistProps {
  playlistAnim: Animated.Value;
}
const Playlist = ({ playlistAnim }: PlaylistProps) => {
  const { width, height } = useWindowDimensions();
  const playlistRef = useRef('mini');

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (evt, gestureState) => {
        const { dy } = gestureState;
        if (playlistRef.current === 'mini') {
          playlistAnim.setValue(-dy);
        } else if (playlistRef.current === 'full') {
          playlistAnim.setValue(height - dy);
        }
      },
      onPanResponderEnd: (evt, gestureState) => {
        const { dy } = gestureState;
        // dy가 -100보다 작고, playlistRef가 mini인 경우
        if (dy < -100 && playlistRef.current === 'mini') {
          Animated.spring(playlistAnim, {
            toValue: height,
            useNativeDriver: false,
          }).start();
          playlistRef.current = 'full';
        }
        // dy가 -100보다 크고, playlistRef가 mini인 경우
        if (-100 < dy && playlistRef.current === 'mini') {
          Animated.spring(playlistAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }

        // dy가 100보다 크고, playlistRef가 full인 경우
        if (dy > 100 && playlistRef.current === 'full') {
          Animated.spring(playlistAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          playlistRef.current = 'mini';
        }

        // dy가 100보다 작고, playlistRef가 full인 경우
        if (dy < 100 && playlistRef.current === 'full') {
          Animated.spring(playlistAnim, {
            toValue: height,
            useNativeDriver: false,
          }).start();
        }
      },
    }),
  ).current;
  return (
    <>
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          borderWidth: 1,
          backgroundColor: '#222',
          borderBottomColor: '#666',
          borderBottomWidth: 1,
          flexDirection: 'row',
          marginTop: playlistAnim.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [0, -200, -200],
          }),
          height: playlistAnim.interpolate({
            inputRange: [0, 100],
            outputRange: [60, 160],
          }),
          alignItems: 'center',
          paddingLeft: playlistAnim.interpolate({
            inputRange: [0, height / 2, height],
            outputRange: [10, width * 0.1, width * 0.1],
          }),
        }}
      >
        <View>
          {/* top */}
          <Animated.View
            style={{
              height: playlistAnim.interpolate({
                inputRange: [height / 2, height],
                outputRange: [0, 100],
              }),
              opacity: playlistAnim.interpolate({
                inputRange: [height / 2, height],
                outputRange: [0, 1],
              }),
            }}
          >
            <Text
              style={{
                color: 'white',
                height: '100%',
                borderWidth: 1,
                borderColor: 'white',
              }}
            >
              Top
            </Text>
          </Animated.View>
          {/* image: thumbnail */}
          <Animated.View
            style={{
              width: playlistAnim.interpolate({
                inputRange: [0, height / 2, height],
                outputRange: [50, width * 0.8, width * 0.8],
              }),
              height: playlistAnim.interpolate({
                inputRange: [0, height / 2, height],
                outputRange: [50, width * 0.8, width * 0.8],
              }),
            }}
          >
            <Image
              source={{ uri: 'https://picsum.photos/50' }}
              style={styles.image}
            />
          </Animated.View>
          {/* middle */}
          <Animated.View
            style={{
              height: playlistAnim.interpolate({
                inputRange: [height / 2, height],
                outputRange: [0, 250],
              }),
              opacity: playlistAnim.interpolate({
                inputRange: [height / 2, height],
                outputRange: [0, 1],
              }),
            }}
          >
            <Text
              style={{
                color: 'white',
                height: '100%',
                borderColor: 'white',
              }}
            >
              Middle
            </Text>
          </Animated.View>
        </View>
        {/* <PlaylistFull /> */}
        <Animated.View
          style={[
            {
              flex: 1,
              opacity: playlistAnim.interpolate({
                inputRange: [0, height / 2],
                outputRange: [1, 0],
              }),
            },
          ]}
        >
          <PlaylistMini />
        </Animated.View>
        <Animated.View
          style={{
            position: 'absolute',
            width,
            height: playlistAnim.interpolate({
              inputRange: [height / 2, height],
              outputRange: [0, 100],
            }),
            borderWidth: 1,
            borderColor: 'white',
            bottom: 0,
            opacity: playlistAnim.interpolate({
              inputRange: [height / 2, height],
              outputRange: [0, 1],
            }),
          }}
        >
          <Text style={{ color: 'white' }}>Bottom</Text>
        </Animated.View>
      </Animated.View>
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  playlistContainer: {
    flex: 1,
  },
});
