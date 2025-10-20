import { useRef } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';

const PanResponderBall = () => {
  const panAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    // 터치 중(드래그)일 때 공 이동
    onPanResponderMove: Animated.event(
      [
        null,
        {
          dx: panAnim.x,
          dy: panAnim.y,
        },
      ],
      { useNativeDriver: false },
    ),
    // 터치 종료(드래그 종료)일 때 공 이동 및 감속
    onPanResponderEnd(e, gestureState) {
      Animated.decay(panAnim, {
        velocity: { x: gestureState.vx, y: gestureState.vy },
        deceleration: 0.997,
        useNativeDriver: true,
      }).start();
    },
    // 1초 후 공이 제자리로 돌아오도록
    onPanResponderRelease(e, gestureState) {
      setTimeout(() => {
        panAnim.setValue({ x: 0, y: 50 });
        Animated.spring(panAnim, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
        }).start();
      }, 1500);
    },
  });
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {/* 공 표시 */}
      <Animated.View
        {...panResponder.panHandlers}
        style={{
          position: 'absolute',
          bottom: 20,
          transform: [{ translateX: panAnim.x }, { translateY: panAnim.y }],
        }}
      >
        <Text style={{ fontSize: 100 }}>🏀</Text>
      </Animated.View>
    </View>
  );
};

export default PanResponderBall;
