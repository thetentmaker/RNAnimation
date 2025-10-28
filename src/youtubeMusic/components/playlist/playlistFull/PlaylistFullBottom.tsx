import {
  Animated,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface PlaylistFullBottomProps {
  playlistAnim: Animated.Value;
}
const PlaylistFullBottom = ({ playlistAnim }: PlaylistFullBottomProps) => {
  const { width, height } = useWindowDimensions();
  const { bottom } = useSafeAreaInsets();
  return (
    <Animated.View
      style={{
        position: 'absolute',
        width,
        height: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 70 + bottom],
        }),
        bottom: 0,
        backgroundColor: '#444',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        opacity: playlistAnim.interpolate({
          inputRange: [height / 2, height],
          outputRange: [0, 1],
        }),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          height: 70,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            flex: 1,
            color: 'white',
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          다음트랙
        </Text>
        <Text style={{ flex: 1, color: 'white', textAlign: 'center' }}>
          가사
        </Text>
        <Text style={{ flex: 1, color: 'white', textAlign: 'center' }}>
          관련 항목
        </Text>
      </View>
    </Animated.View>
  );
};

export default PlaylistFullBottom;
