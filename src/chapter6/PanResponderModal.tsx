import {
  Animated,
  Button,
  Modal,
  PanResponder,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef, useState } from 'react';
const PanResponderModal = () => {
  const renderCount = useRef(0);
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const [show, setShow] = useState(false);
  const { bottom } = useSafeAreaInsets();
  console.log('renderCount', renderCount);
  renderCount.current++;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dy > 100) {
        hideMode();
      }
    },
  });
  const showMode = () => {
    setShow(true);
    Animated.timing(interpolateAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const hideMode = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setShow(false);
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 100 }}>
        <Button title="모달 보여주기" onPress={showMode} />
      </View>
      <>
        {/* menu background */}
        {show && (
          <TouchableWithoutFeedback onPress={hideMode}>
            <Animated.View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#00000090',
                opacity: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              }}
            />
          </TouchableWithoutFeedback>
        )}
        {/* menu content */}
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            position: 'absolute',
            bottom: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [-500, 0],
            }),
            padding: 20,
            borderWidth: 1,
            paddingBottom: 20 + bottom,
            backgroundColor: 'white',
            width: '100%',
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}
        >
          {data.map(item => (
            <ListItem
              key={item.title}
              icon={item.icon}
              color={item.color}
              title={item.title}
              onPress={hideMode}
            />
          ))}
        </Animated.View>
      </>
    </View>
  );
};

const data: Omit<ListItemProps, 'onPress'>[] = [
  { icon: 'pin', title: '저장하기', color: '#333' },
  { icon: 'heart', title: '좋아요', color: '#333' },
  { icon: 'trash', title: '삭제하기', color: '#333' },
  { icon: 'back', title: '닫기', color: '#999' },
];
export default PanResponderModal;

interface ListItemProps {
  icon: React.ComponentProps<typeof Icon>['name'];
  color?: string;
  title: string;
  onPress: () => void;
}
const ListItem = ({ icon, color = '#333', title, onPress }: ListItemProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderBottomColor: '#f2f2f2',
          borderBottomWidth: 1,
          height: 60,
        }}
      >
        <Icon name={icon} size={20} color={color} />
        <Text style={{ color, fontSize: 15, marginLeft: 20 }}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
