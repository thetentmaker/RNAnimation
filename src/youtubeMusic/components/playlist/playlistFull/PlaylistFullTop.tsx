import {
  Animated,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';

interface PlaylistFullTopProps {
  playlistAnim: Animated.Value;
}
const PlaylistFullTop = ({ playlistAnim }: PlaylistFullTopProps) => {
  const { width, height } = useWindowDimensions();
  return (
    <Animated.View
      style={{
        height: playlistAnim.interpolate({
          inputRange: [0, height / 2.5, height],
          outputRange: [0, 0, 100],
        }),
        opacity: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 1],
        }),
      }}
    >
      <Animated.View
        style={{
          width: playlistAnim.interpolate({
            inputRange: [0, height / 2.5, height],
            outputRange: [0, 0, width],
          }),
          height: 30,
          marginLeft: -width * 0.1,
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <IconItem name="keyboard-arrow-down" />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 30,
            backgroundColor: '#111',
            borderRadius: 100,
          }}
        >
          <View
            style={{
              backgroundColor: '#333',
              height: 30,
              borderWidth: 1,
              paddingHorizontal: 12,
              justifyContent: 'center',
              borderRadius: 100,
            }}
          >
            <Text style={{ color: '#ffffff90', fontSize: 12 }}>노래</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }}>
            <Text style={{ color: '#ffffff80', fontSize: 12 }}>동영상</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <IconItem name="cast" />
          <IconItem name="more-vert" />
        </View>
      </Animated.View>
    </Animated.View>
  );
};

interface IconItemProps {
  name: React.ComponentProps<typeof Icon>['name'];
}
const IconItem = ({ name }: IconItemProps) => {
  return (
    <View
      style={{
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Icon name={name} size={24} color="white" />
    </View>
  );
};

export default PlaylistFullTop;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
