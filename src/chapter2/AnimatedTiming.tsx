import { useRef } from 'react';
import { Animated, Button, Easing, StyleSheet } from 'react-native';

// Easing ease / back / bounce /elastic /circle
const AnimatedTiming = () => {
  const translateXAnim = useRef(new Animated.Value(-100)).current;
  const onButtonPress = () => {
    translateXAnim.setValue(-100);
    Animated.timing(translateXAnim, {
      toValue: 100,
      duration: 1000,
      delay: 0,
    //   easing: Easing.inOut(Easing.ease),
    //   easing: Easing.inOut(Easing.back(4)),
    //   easing: Easing.in(Easing.bounce),
    //   easing: Easing.in(Easing.elastic(2)),
      easing: Easing.out(Easing.circle),
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Button title="움직여라 !" onPress={onButtonPress} />
      <Animated.Text
        style={[styles.text, { transform: [{ translateX: translateXAnim }] }]}
      >
        🍊
      </Animated.Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
  },
});

export default AnimatedTiming;
