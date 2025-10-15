import { useRef } from 'react';
import { Animated, StyleSheet, Button } from 'react-native';

// sequence, delay, parallel, stagger
// 1) y -200 -> y 0 timing
// 2) x 0 -> 100 timing
const AnimatedComposing = () => {
  const translateXAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(-200)).current;

  const onButtonPress = () => {
    translateYAnim.setValue(-200);
    translateXAnim.setValue(0);
    // sequence
    // Animated.sequence([
    //   Animated.timing(translateYAnim, {
    //     toValue: 0,
    //     useNativeDriver: true,
    //   }),
    //   Animated.delay(1000),
    //   Animated.timing(translateXAnim, {
    //     toValue: 100,
    //     // delay: 1000,
    //     useNativeDriver: true,
    //   }),
    // ]).start();

    // parallel
    // setTimeout(() => {
    //     translateYAnim.stopAnimation();
    // }, 700);

    // Animated.parallel([
    //   Animated.timing(translateYAnim, {
    //     toValue: 0,
    //     duration: 1000,
    //     useNativeDriver: true,
    //   }),
    //   Animated.timing(translateXAnim, {
    //     toValue: 100,
    //     duration: 1300,
    //     useNativeDriver: true,
    //   }),
    // ]).start();

    // stagger
    Animated.stagger(1000, [
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(translateXAnim, {
        toValue: 100,
        duration: 1300,
        useNativeDriver: true,
      }),
    ]).start();
  };
  return (
    <>
      <Button title="Start" onPress={onButtonPress} />
      <Animated.Text
        style={[
          styles.text,
          {
            transform: [
              { translateY: translateYAnim },
              { translateX: translateXAnim },
            ],
          },
        ]}
      >
        🍊
      </Animated.Text>
    </>
  );
};

export default AnimatedComposing;

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
  },
});
