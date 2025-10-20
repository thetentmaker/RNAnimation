import {
  Button,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/entypo';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';
const PanResponderModal = () => {
  const [show, setShow] = useState(false);
  const { bottom } = useSafeAreaInsets();

  const showMode = () => {
    console.log('showMode');
    setShow(true);
  };
  const hideMode = () => {
    console.log('hideMode');
    setShow(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginTop: 100 }}>
        <Button title="모달 보여주기" onPress={showMode} />
      </View>
      {show && (
        <>
          {/* menu background */}
          <TouchableWithoutFeedback onPress={hideMode}>
            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#00000090',
              }}
            />
          </TouchableWithoutFeedback>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
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
          </View>
        </>
      )}
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
