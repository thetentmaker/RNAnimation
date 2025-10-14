import { useEffect, useRef } from 'react';
import { Animated, Button, StyleSheet } from 'react-native';

// setValue();
// addLisstener(callback);
// removeAllListeners();
// stopAnimation();
// resetAnimation();
// setOffset()
// flattenOffset();
// extractOffset();

const AnimatedValue = () => {
  const translateXAnim = useRef(new Animated.Value(-100)).current;

  const onButtonPress = () => {
    translateXAnim.setValue(-100);
    translateXAnim.addListener(({ value }) => console.log('value', value));
    Animated.timing(translateXAnim, {
      toValue: 100,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      //   translateXAnim.stopAnimation();
      translateXAnim.resetAnimation();
    }, 500);
  };

  useEffect(() => {
    return () => translateXAnim.removeAllListeners();
  });

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

export default AnimatedValue;

const styles = StyleSheet.create({
  text: {
    fontSize: 70,
  },
});
