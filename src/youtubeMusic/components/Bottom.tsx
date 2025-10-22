import {
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { BOTTOM_HEIGHT } from '../utils';
import Icon from '@react-native-vector-icons/material-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Bottom = () => {
  const { bottom } = useSafeAreaInsets();
  console.log('bottom', bottom);
  return (
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
