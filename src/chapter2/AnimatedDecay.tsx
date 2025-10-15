import { useRef } from 'react';
import { Animated, StyleSheet, Button } from 'react-native';

// x -100 decay 애니메이션
const AnimatedDecay = () => {
  const translateXAnim = useRef(new Animated.Value(-100)).current;
  const onButtonPress = () => {
    translateXAnim.setValue(-100);
    Animated.decay(translateXAnim, {
      velocity: 1,
      deceleration: 0.995,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Button title="거기 멈춰!" onPress={onButtonPress} />
      <Animated.Text
        style={[styles.text, { transform: [{ translateX: translateXAnim }] }]}
      >
        🚗
      </Animated.Text>
    </>
  );
};

export default AnimatedDecay;

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
  },
});
