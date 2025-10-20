import { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  InteractionManager,
  StyleSheet,
  Text,
  View,
} from 'react-native';

// runAfterInteractions, cancel
const InteractionManagerIntro = () => {
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: true,
    }).start(finished => {
      Alert.alert('hello interaction manager');
    });

    const interactionManagerPromise = InteractionManager.runAfterInteractions(
      () => {
        // 애니메이션 이 작동시킬 액션
        // Alert.alert('hello interaction manager');
      },
    );

    return () => interactionManagerPromise.cancel();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Animated.Text style={[styles.animatedText, { opacity: opacityAnim }]}>
        🍊
      </Animated.Text>
    </View>
  );
};

export default InteractionManagerIntro;

const styles = StyleSheet.create({
  animatedText: {
    fontSize: 50,
  },
});
