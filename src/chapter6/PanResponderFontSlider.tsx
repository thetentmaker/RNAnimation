import {
  Animated,
  PanResponder,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import repeat from '../utils/Loop';
import { useRef, useState } from 'react';

const BOX_SIZE = 50;
const CIRCLE_SIZE = 10;
const FONT = [
  {
    title: { fontSize: 20, lineHeight: 32 },
    body: { fontSize: 12 },
  },
  {
    title: { fontSize: 24, lineHeight: 38 },
    body: { fontSize: 14 },
  },
  {
    title: { fontSize: 30, lineHeight: 40 },
    body: { fontSize: 15 },
  },
  {
    title: { fontSize: 35, lineHeight: 50 },
    body: { fontSize: 19 },
  },
];

const PanResponderFontSlider = () => {
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => true,
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onPanResponderStart: (event, gestureState) => {
      console.log('onPanResponderStart', event, gestureState);
    },
    onPanResponderMove: (event, gestureState) => {
      console.log('onPanResponderMove', event, gestureState);
      circleAnim.setValue(gestureState.dx + step * BOX_SIZE);
    },
    onPanResponderEnd: (event, gestureState) => {
      console.log('onPanResponderEnd', event, gestureState);
      const fontStep = step + Math.round(gestureState.dx / 50);
      const toValue = fontStep * BOX_SIZE;
      setStep(fontStep);
      Animated.spring(circleAnim, {
        toValue,
        friction: 7,
        tension: 50,
        useNativeDriver: true,
      }).start();
    },
  });

  const circleAnim = useRef(new Animated.Value(0)).current;
  const [step, setStep] = useState(0);
  const onPress = (index: number) => () => {
    setStep(index);
    Animated.spring(circleAnim, {
      toValue: index * BOX_SIZE,
      friction: 7,
      tension: 50,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          borderWidth: 1,
          width: 200,
          height: 150,
          justifyContent: 'flex-end',
        }}
      >
        {/* text step view */}
        <View>
          <Text style={FONT[step].title}>Font Step {step + 1}</Text>
          <Text style={FONT[step].body}>font body style</Text>
        </View>
        {/* slider 영역 */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* 가로선 */}
          <View
            style={{
              position: 'absolute',
              height: 1,
              top: 24.5,
              width: BOX_SIZE * 3,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}
          />
          {/* 세로 회색 동그라미 */}
          <View style={{ flexDirection: 'row' }}>
            {repeat(4, index => (
              <TouchableWithoutFeedback key={index} onPress={onPress(index)}>
                <View
                  style={{
                    width: BOX_SIZE,
                    height: BOX_SIZE,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: '#ddd',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <Animated.View
            {...panResponder.panHandlers}
            style={{
              width: CIRCLE_SIZE,
              height: CIRCLE_SIZE,
              backgroundColor: '#333',
              position: 'absolute',
              left: BOX_SIZE / 2 - CIRCLE_SIZE / 2,
              borderRadius: 100,
              transform: [{ translateX: circleAnim }],
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PanResponderFontSlider;
