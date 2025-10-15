import { useRef } from "react";
import { View, StyleSheet, Animated, Button } from "react-native";

// y축 -100 100으로 이동하는 sprint 애니메이션
const AnimatedSpring = () => {
  const translateYAnim = useRef(new Animated.Value(-100)).current;
  const onButtonPress = () => {
    translateYAnim.setValue(-100);
    Animated.spring(translateYAnim, {
      toValue: 100,
      // bounciness: 8, // 탄력제어
      // speed: 12, // 스프링의 속도

      // friction: 7, // 에너지를 소비
      // tension: 40, // 스프링이 얼마나 많은 에너지를 가지고 있는지

      // stiffness: 100, // 스프링의 강도
      // damping: 10, // 스프링의 감쇠
      // mass: 1, // 스프링의 질량
      velocity: 0, // 스프링의 초기 속도
      useNativeDriver: true,
    }).start();
  };
  return (
    <View style={styles.container}>
      <Button title="스프링으로 움직인다" onPress={onButtonPress} />
      <Animated.Text style={[styles.text, { transform: [{ translateY: translateYAnim }] }]}>🍊</Animated.Text>
    </View>
  );
};

export default AnimatedSpring;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 70,
  },
});