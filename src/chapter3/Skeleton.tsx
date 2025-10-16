import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;

const Skeleton = () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    try {
      Animated.loop(
        Animated.timing(interpolateAnim, {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000,
        }),
      ).start();
    } catch (error) {
      console.error(error);
    }
  }, [interpolateAnim]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
      }}
    >
      {/* 8개의 skeleton item 생성  */}
      {[...Array(8)].map((_, index) => {
        return <SkeletonItem key={index} interpolateAnim={interpolateAnim} />;
      })}
    </View>
  );
};

interface SkeletonItemProps {
  interpolateAnim: Animated.Value;
}

const SkeletonItem = ({ interpolateAnim }: SkeletonItemProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginVertical: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          width: 60,
          height: 60,
          backgroundColor: '#dfdfdf',
          borderRadius: 4,
        }}
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <View
          style={{
            width: '80%',
            height: 14,
            backgroundColor: '#dfdfdf',
            borderRadius: 4,
          }}
        />
        <View style={{ height: 6 }} />
        <View
          style={{
            width: '100%',
            height: 14,
            backgroundColor: '#dfdfdf',
            borderRadius: 4,
          }}
        />
        <View style={{ height: 6 }} />
        <View
          style={{
            width: '30%',
            height: 8,
            backgroundColor: '#dfdfdf',
            borderRadius: 4,
          }}
        />
      </View>
      {/* LinearGradient를 View로 감싸기 */}
      <Animated.View
        style={{
          position: 'absolute',
          top: -30,
          transform: [
            {
              translateX: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [-windowWidth * 0.2, windowWidth * 1.3],
              }),
            },
            { rotate: '20deg' },
          ],
        }}
      >
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={['#ffffff00', '#ffffff90', '#ffffff00']}
        >
          <View style={{ width: 40, height: 100 }} />
        </LinearGradient>
      </Animated.View>
    </View>
  );
};

export default Skeleton;
