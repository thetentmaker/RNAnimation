import { Animated, Button, StyleSheet } from 'react-native';

// Animated 사칙연산 메소드
// add, subtract, divide, multiply
// Animated 핸들러 메소드
// start, reset, loop
const AnimatedOtherMethod = () => {
  const value1 = new Animated.Value(100);
  const value2 = new Animated.Value(30);
  const opacityAnim = new Animated.Value(1);
  console.log(
    Animated.add(value1, value2),
    Animated.subtract(value1, value2),
    Animated.divide(value1, value2),
    Animated.multiply(value1, value2),
  );

  const onButtonPress = () => {
    Animated.loop(
      Animated.timing(opacityAnim, { toValue: 0, useNativeDriver: true }),
      {
        iterations: 3,
      },
    ).start();
  };
  return (
    <>
      <Button title="Start" onPress={onButtonPress} />
      <Animated.Text style={[styles.text, { opacity: opacityAnim }]}>
        🍊
      </Animated.Text>
    </>
  );
};

export default AnimatedOtherMethod;

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
  },
});
