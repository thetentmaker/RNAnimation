import { useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
  Animated,
  PanResponderGestureState,
  GestureResponderEvent,
  PanResponder,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.7;
const cardHeight = screenWidth * 0.7 * 0.58;

const CARDS = [
  {
    color: '#aaa',
  },
  {
    color: '#bbb',
  },
  {
    color: '#ccc',
  },
  {
    color: '#ddd',
  },
  {
    color: '#eee',
  },
  {
    color: '#f2f2f2',
  },
];

const MobilePay = () => {
  const { width, height } = useWindowDimensions();
  const yAnim = useRef(new Animated.Value(0)).current;
  const cardRef = useRef<string>('fold'); // fold, unfold
  const rotateZAnim = useRef(new Animated.Value(0)).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (
        event: GestureResponderEvent,
        gesture: PanResponderGestureState,
      ) => {
        const { dy, moveY } = gesture;
        console.log('dy', dy);

        if (5 < dy && dy < 100 && cardRef.current === 'fold') {
          yAnim.setValue(dy);
        }
        if (5 < dy && dy < 100 && cardRef.current === 'unfold') {
          rotateZAnim.setValue(dy);
        }

        if (-75 < dy && dy < 5 && cardRef.current === 'unfold') {
          yAnim.setValue(65 + dy);
        }
      },
      onPanResponderEnd(e, gestureState) {
        // console.log(gestureState);
        const { dy } = gestureState;
        console.log('gestureState', gestureState);
        if (5 < dy) {
          Animated.spring(yAnim, {
            toValue: 65,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'unfold';
        }

        if (5 < dy && cardRef.current === 'unfold') {
          Animated.spring(rotateZAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
        }

        if (dy < -5) {
          Animated.spring(yAnim, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          cardRef.current = 'fold';
        }
      },
    }),
  ).current;
  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <View
        style={{
          position: 'relative',
          width: width * 0.7,
          height: width * 0.7 * 0.58 + (CARDS.length - 1) * 20,
        }}
      >
        {CARDS.map((card, index) => {
          const multiplayValue = useRef(new Animated.Value(index - 3)).current;
          const translateY = Animated.multiply(yAnim, multiplayValue);
          return (
            <Animated.View
              key={index}
              style={{
                transform: [
                  { translateY: translateY },
                  {
                    rotateZ: rotateZAnim.interpolate({
                      inputRange: [0, 20],
                      outputRange: ['0deg', '2deg'],
                    }),
                  },
                ],
                position: 'absolute',
                backgroundColor: card.color,
                width: width * 0.7,
                height: width * 0.7 * 0.58,
                marginTop: index * 20,
                borderRadius: 15,
                // iOS shadow
                shadowColor: '#000',
                shadowOffset: {
                  width: -3,
                  height: -3,
                },
                shadowOpacity: 0.2,
                shadowRadius: 10,
                // Android shadow
                elevation: 5,
              }}
            />
          );
        })}
      </View>
    </View>
  );
};

export default MobilePay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
