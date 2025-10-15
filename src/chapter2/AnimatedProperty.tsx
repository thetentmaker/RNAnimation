import { useRef } from 'react';
import { StyleSheet, Animated, Button } from 'react-native';

const AnimatedProperty = () => {
  const heightAnim = useRef(new Animated.Value(100)).current;

  const onButtonPress = () => {
    heightAnim.setValue(100);
    Animated.timing(heightAnim, {
      toValue: 200,
      useNativeDriver: false,
    }).start();
  };
  return (
    <>
      <Button title="커져라!" onPress={onButtonPress} />
      <Animated.View
        style={[
          styles.container,
          {
            height: heightAnim,
            backgroundColor: heightAnim.interpolate({
              inputRange: [100, 180, 200],
              outputRange: ['#ffa100', 'red', '#ffa100'],
            }),
            transform: [
              {
                rotate: heightAnim.interpolate({
                  inputRange: [100, 200],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      />
    </>
  );
};

export default AnimatedProperty;

const styles = StyleSheet.create({
  container: {
    width: 100,
  },
});
