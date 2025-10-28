import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { BOTTOM_HEIGHT } from '../../utils';
import Icon from '@react-native-vector-icons/material-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Animated } from 'react-native';

interface BottomProps {
  playlistAnim: Animated.Value;
}
const Bottom = ({ playlistAnim }: BottomProps) => {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();
  return (
    <Animated.View
      style={{
        marginBottom: playlistAnim.interpolate({
          inputRange: [0, height / 2, height],
          outputRange: [0, -BOTTOM_HEIGHT - bottom, -BOTTOM_HEIGHT - bottom],
        }),
      }}
    >
      <View style={{ paddingBottom: bottom, backgroundColor: '#222' }}>
        <View
          style={{
            height: BOTTOM_HEIGHT,
            flexDirection: 'row',
          }}
        >
          <BottomItem name={'home-filled'} title={'홈'} />
          <BottomItem name={'explore'} title={'둘러보기'} />
          <BottomItem name={'library-music'} title={'보관함'} />
        </View>
      </View>
    </Animated.View>
  );
};

export default Bottom;

interface BottomItemProps {
  name: React.ComponentProps<typeof Icon>['name'];
  title: string;
}
const BottomItem = ({ name, title }: BottomItemProps) => {
  return (
    <TouchableOpacity style={{ alignItems: 'center', flex: 1 }}>
      <View style={{ marginVertical: 4, alignItems: 'center' }}>
        <Icon name={name} size={30} color="white" />
        <Text style={{ color: 'white', fontSize: 12 }}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};
