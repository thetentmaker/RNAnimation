import { useRef, useState } from 'react';
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

const MobilePay = () => {
  const cards = [
    {
      color: '#aaa',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#bbb',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#ccc',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#ddd',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#eee',
      xAnim: useRef(new Animated.Value(0)).current,
    },
    {
      color: '#f2f2f2',
      xAnim: useRef(new Animated.Value(0)).current,
    },
  ];

  const [focus, setFocus] = useState(5);
  const { width, height } = useWindowDimensions();
  const yAnim = useRef(new Animated.Value(0)).current;
  const cardRef = useRef<string>('fold'); // fold, unfold
  const rotateZAnim = useRef(new Animated.Value(0)).current;
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (
      event: GestureResponderEvent,
      gesture: PanResponderGestureState,
    ) => {
      const { dy, dx, moveY } = gesture;
      console.log('dy=', dy, 'dx=', dx);
      // dy, dx 중 뭐가 더 큰지 판단한다.
      const xSlider: Boolean = Math.abs(dx) > Math.abs(dy);
      const ySlider: Boolean = Math.abs(dy) > Math.abs(dx);

      if (xSlider) {
        // dx가 -5보다 작은 경우(즉, 왼쪽으로 일정 이상 스와이프 했을 때) && 카드 상태가 'fold'일 때만 아래 동작 수행
        if (dx < -5 && cardRef.current === 'fold' && 0 <= focus) {
          console.log('xSlider: focus=', focus);
          cards[focus].xAnim.setValue(dx);
        }
      }

      if (ySlider) {
        console.log('ySlider', ySlider);
        if (5 < dy && dy < 100 && cardRef.current === 'fold') {
          yAnim.setValue(dy);
        }
        if (5 < dy && dy < 100 && cardRef.current === 'unfold') {
          rotateZAnim.setValue(dy);
        }

        if (-75 < dy && dy < 5 && cardRef.current === 'unfold') {
          yAnim.setValue(65 + dy);
        }
      }
    },
    onPanResponderEnd(e, gestureState) {
      // console.log(gestureState);
      // onPanResponderEnd에서도 move에서처럼 y, x slide 판단을 해야한다.
      const { dy, dx, moveY } = gestureState;
      const xSlider: Boolean = Math.abs(dx) > Math.abs(dy);
      const ySlider: Boolean = Math.abs(dy) > Math.abs(dx);

      if (xSlider) {
        if (dx < -5 && cardRef.current === 'fold' && 0 <= focus) {
          Animated.timing(cards[focus].xAnim, {
            toValue: -width * 0.8,
            duration: 100,
            useNativeDriver: true,
          }).start(finished => {
            if (finished) {
              setFocus(prevFocus => prevFocus - 1);
            }
          });
        }

        if (5 < dx && cardRef.current === 'fold' && focus < 5) {
          Animated.timing(cards[focus + 1].xAnim, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true,
          }).start(finished => {
            if (finished) {
              setFocus(prevFocus => prevFocus + 1);
            }
          });
        }
      }

      if (ySlider) {
        console.log('ySlider', ySlider);
        if (5 < dy) {
          Animated.spring(yAnim, {
            toValue: 65,
            useNativeDriver: true,
          }).start();
          cardRef.current = 'unfold';
        }

        if (5 < dy && cardRef.current === 'unfold') {
          Animated.spring(rotateZAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }

        if (dy < -5) {
          Animated.spring(yAnim, {
            toValue: 0,
            useNativeDriver: true,
          }).start();
          cardRef.current = 'fold';
        }
      }
      if (xSlider) {
        console.log('xSlider', xSlider);
      }
    },
  });

  return (
    <View {...panResponder.panHandlers} style={styles.container}>
      <View
        style={{
          position: 'relative',
          width: width * 0.7,
          height: width * 0.7 * 0.58 + (cards.length - 1) * 20,
        }}
      >
        {cards.map((card, index) => {
          // '-3'은 카드 스택의 가운데 카드를 기준점(0)으로 잡기 위해 사용됐습니다.
          // 카드의 인덱스가 3이면 기준 카드이고, 인덱스가 더 작거나 크면 위아래로 애니메이션 이동합니다.
          // 만약 카드 수가 달라질 수 있다면 중앙 인덱스를 직접 계산하는 것이 명확합니다.
          const centerIndex = Math.floor(cards.length / 2);
          const multiplayValue = useRef(
            new Animated.Value(index - centerIndex),
          ).current;
          const translateY = Animated.multiply(yAnim, multiplayValue);
          return (
            <Animated.View
              key={index}
              style={{
                transform: [
                  { translateY: translateY },
                  { translateX: card.xAnim },
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
