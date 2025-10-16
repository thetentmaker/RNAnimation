import { Animated, View } from 'react-native';
// fontisto icons
import Icon from '@react-native-vector-icons/fontawesome6';
import { useEffect, useRef } from 'react';

const SnowAnimation = () => {
  return (
    <View
      style={{
        backgroundColor: '#121723',
        flex: 1,
      }}
    >
      {Array.from({ length: 50 }).map((_, index) => {
        const interpolateAnim = useRef(new Animated.Value(0)).current;
        const renderCount = useRef(0);
        renderCount.current++;
        console.log('renderCount', renderCount.current);

        useEffect(() => {
          const loop = Animated.loop(
            Animated.timing(interpolateAnim, {
              toValue: 1,
              duration: 5000,
              delay: index * 100,
              useNativeDriver: false,
            }),
          );
          loop.start();
        });
        console.info('renderCount', renderCount.current);
        return (
          <Animated.View
            key={index}
            style={{
              position: 'absolute',
              marginTop: 30,
              left: `${Math.floor(Math.random() * 100)}%`,
              top: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['-10%', '110%'],
              }),
            }}
          >
            <Icon name="snowflake" size={16} color="#fff" />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default SnowAnimation;
