import { View, Text, StyleSheet, Animated, Button, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRef } from 'react';
import { Ionicons } from '@react-native-vector-icons/ionicons';

// layout
// 스타일림
const Snackbar = () => {
  const translateYAnim = useRef(new Animated.Value(100)).current;
  const onPressButton = () => {
    Animated.sequence([
      Animated.timing(translateYAnim, {
        toValue: 0,
        useNativeDriver: true,
        easing: Easing.out(Easing.circle),
      }),
      Animated.delay(2000),
      Animated.timing(translateYAnim, {
        toValue: 100,
        useNativeDriver: true,
        easing: Easing.in(Easing.circle),
      }),
    ]).start();
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      <Button title="오류가 발견됐습니다." onPress={onPressButton} />
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: translateYAnim }] },
        ]}
      >
        <View style={styles.wrapper}>
          <Ionicons name="checkmark-circle" size={24} color="white" />
          <Text style={styles.text}>Snackbar hello~</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Snackbar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  wrapper: {
    backgroundColor: '#222',
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 20,
    margin: 14,
    borderRadius: 4,
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 15,
    marginLeft: 10,
  },
  icon: {
    color: 'white',
  },
});
