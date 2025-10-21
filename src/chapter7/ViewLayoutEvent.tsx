import { useState } from 'react';
import {
  Button,
  LayoutChangeEvent,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

const ViewLayoutEvent = () => {
  const [number, setNumber] = useState(0);
  const { width, height } = useWindowDimensions();
  console.log('width', width, 'height', height);
  const onLayout = (event: LayoutChangeEvent) => {
    console.log('onLayout', event.nativeEvent, event.nativeEvent);
  };
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View onLayout={onLayout} style={{ borderWidth: 1 }}>
        <Text style={{ width: 10 }}>{number}</Text>
        <Button title="Increment" onPress={() => setNumber(number + 1)} />
      </View>
    </View>
  );
};

export default ViewLayoutEvent;
