import { useRef } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';

const AnimatedComponents = () => {
  const opacityAnim = useRef(new Animated.Value(1)).current;
  const onButtonPress = () => {
    console.log('button pressed');
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };
  return (
    <>
      <Button title="사라져라!" onPress={onButtonPress} />
      <Animated.Text style={[styles.animatedText, { opacity: opacityAnim }]}>🍊</Animated.Text>
    </>
  );
};

export default AnimatedComponents;

const styles = StyleSheet.create({
  animatedText: {
    fontSize: 40,
  },
});
