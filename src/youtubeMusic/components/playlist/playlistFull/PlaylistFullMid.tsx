import { Animated, Text, useWindowDimensions, View } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { faker } from '@faker-js/faker';

interface PlaylistFullMidProps {
  playlistAnim: Animated.Value;
}
const PlaylistFullMid = ({ playlistAnim }: PlaylistFullMidProps) => {
  const { height } = useWindowDimensions();
  return (
    <Animated.View
      style={{
        height: playlistAnim.interpolate({
          inputRange: [0, height / 2, height],
          outputRange: [0, 0, 250],
        }),
        width: playlistAnim.interpolate({
          inputRange: [0, height / 2.5, height],
          outputRange: ['0%', '0%', '100%'],
        }),
        opacity: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 1],
        }),
      }}
    >
      <MiddleTitle />
      <MiddleTimeline />
      <MiddleButtons />
    </Animated.View>
  );
};

const MiddleButtons = () => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: width * 0.1,
        marginTop: 20,
        alignItems: 'center',
      }}
    >
      <Icon name="shuffle" color="white" size={24} />
      <Icon name="skip-previous" color="white" size={24} />
      <View
        style={{ backgroundColor: '#ffffff20', padding: 14, borderRadius: 100 }}
      >
        <Icon name="play-arrow" color="white" size={40} />
      </View>
      <Icon name="skip-next" color="white" size={24} />
      <Icon name="repeat" color="white" size={24} />
    </View>
  );
};

const MiddleTimeline = () => {
  const { width } = useWindowDimensions();
  return (
    <View style={{ marginRight: width * 0.1 }}>
      <View
        style={{
          borderBottomWidth: 2,
          borderBottomColor: '#ffffff80',
        }}
      />
      <View
        style={{
          width: 10,
          height: 10,
          backgroundColor: 'white',
          borderRadius: 10,
          marginTop: -6,
        }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text style={{ color: 'white', fontSize: 10 }}>0:03</Text>
        <Text style={{ color: 'white', fontSize: 10 }}>3:57</Text>
      </View>
    </View>
  );
};

const MiddleTitle = () => {
  const { width } = useWindowDimensions();
  return (
    <View
      style={{
        flexDirection: 'row',
        paddingVertical: 30,
        borderWidth: 1,
        marginRight: width * 0.1,
        justifyContent: 'space-between',
      }}
    >
      <Icon name="thumb-down" color="white" size={18} />
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          {faker.music.songName()}
        </Text>
        <Text style={{ color: 'white', fontSize: 14 }}>
          {faker.music.genre()}
        </Text>
      </View>
      <Icon name="thumb-up" color="white" size={18} />
    </View>
  );
};
export default PlaylistFullMid;
