import { useCallback, useRef, useState } from 'react';
import {
  Text,
  View,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  PanResponder,
} from 'react-native';
import repeat from '../utils/Loop';

const { width } = Dimensions.get('window');

const PanResponderBannerSlider = () => {
  const [focus, setFocus] = useState(0);
  const bannerAnim = useRef(new Animated.Value(0)).current;
  const pendingRef = useRef(true);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      console.log('onPanResponderMove: ', gestureState);
      const toRight = gestureState.dx < -80;
      const toLeft = gestureState.dx > 80;
      if (toRight && pendingRef.current && focus < 3) {
        pendingRef.current = false;
        setFocus(focus + 1);
        Animated.timing(bannerAnim, {
          toValue: -(focus + 1) * width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => (pendingRef.current = true));
      } else if (toLeft && pendingRef.current && focus > 0) {
        setFocus(focus - 1);
        Animated.timing(bannerAnim, {
          toValue: -(focus - 1) * width,
          duration: 300,
          useNativeDriver: true,
        }).start(() => (pendingRef.current = true));
      }
    },
  });

  const onPressNavigationButton = useCallback((index: number) => {
    setFocus(index);
    Animated.timing(bannerAnim, {
      toValue: -index * width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={{ flex: 1 }}>
      {/* content box */}
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Animated.View
          {...panResponder.panHandlers}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            transform: [{ translateX: bannerAnim }],
          }}
        >
          {repeat(4, index => (
            <View
              key={index}
              style={{
                width,
                height: width,
                backgroundColor: '#ffa100',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 50, color: '#ffffff' }}>{index}</Text>
            </View>
          ))}
        </Animated.View>
        <View style={{ height: 10 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          {repeat(4, index => {
            const backgroundColor = focus === index ? '#ffa100' : '#ffa10050';
            return (
              <TouchableWithoutFeedback
                hitSlop={10}
                key={index}
                onPress={() => onPressNavigationButton(index)}
              >
                <View
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: 10,
                    backgroundColor: backgroundColor,
                    marginHorizontal: 8,
                  }}
                />
              </TouchableWithoutFeedback>
            );
          })}
        </View>
      </View>
    </View>
  );
};

export default PanResponderBannerSlider;