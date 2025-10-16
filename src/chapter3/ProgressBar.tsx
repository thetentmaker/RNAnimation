import { useRef } from 'react';
import { Animated, Button, Easing, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressBar = () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const clickCount = useRef(1);
  // 수동으로 20%씩 채워 100%까지 채워주는 역할
  const onPressRun = () => {
    console.log('run');
    if (clickCount.current > 5) return;

    if (clickCount.current < 6) {
      const targetValue = 20 * clickCount.current;
      try {
        Animated.spring(interpolateAnim, {
          toValue: targetValue,
          friction: 7,
          tension: 40,
          useNativeDriver: false,
        }).start();
        ++clickCount.current;
      } catch (error) {
        console.error('error: ', error);
      }
    }
  };
  // 자동으로 100%까지 채워주는 역ㅏ, 중간중간 멈추는 액션 추가
  const onPressAutoRun = () => {
    console.log('auto run');
    Animated.sequence([
      Animated.spring(interpolateAnim, {
        toValue: 20,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }),
      Animated.spring(interpolateAnim, {
        toValue: 70,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }),
      Animated.spring(interpolateAnim, {
        toValue: 100,
        friction: 7,
        tension: 40,
        useNativeDriver: false,
      }),
    ]).start();
  };
  // 맨 처음 값으로 되돌가 가는 역할
  const onPressReset = () => {
    console.log('reset');
    Animated.timing(interpolateAnim, {
      toValue: 0,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start(finished => {
      if (finished) {
        clickCount.current = 1;
        interpolateAnim.setValue(0);
        interpolateAnim.stopAnimation();
      }
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="run" onPress={onPressRun} />
      <Button title="auto run" onPress={onPressAutoRun} />
      <Button title="reset" onPress={onPressReset} />

      {/* ProgressBar Container */}
      <View style={styles.progressBar}>
        {/* ProgressBar 바닥 */}
        <View style={styles.progressBarInner} />
        {/* Progressbar 움직이는 부분 */}
        <Animated.View
          style={[
            styles.progressBarMoving,
            {
              width: interpolateAnim.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 300,
  },
  progressBar: {
    position: 'relative',
    margin: 30,
    justifyContent: 'center',
  },
  progressBarInner: {
    backgroundColor: '#222',
    height: 10,
    borderRadius: 10,
  },
  progressBarMoving: {
    backgroundColor: 'blue',
    height: 16,
    position: 'absolute',
    borderRadius: 100,
  },
});
