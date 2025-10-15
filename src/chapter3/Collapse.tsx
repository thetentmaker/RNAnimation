import {
  Animated,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from '@react-native-vector-icons/material-icons';
import { collapseData } from '../utils/data';
import { useRef } from 'react';

interface CollapseItemProps {
  item: { q: string; a: string };
}

const CollapseItem = ({ item }: CollapseItemProps) => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  let isOpened = false;

  const onPress = () => {
    Animated.timing(interpolateAnim, {
      toValue: isOpened ? 0 : 1,
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      isOpened = !isOpened;
    });
  };

  return (
    <View>
      {/* 질문 */}
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.questionContainer}>
          <Text style={styles.question}>{item.q}</Text>
          <Animated.View
            style={[
              styles.iconContainer,
              {
                transform: [
                  {
                    rotate: interpolateAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0deg', '180deg'],
                    }),
                  },
                ],
              },
            ]}
          >
            <MaterialIcons name="expand-more" size={24} color="yellow" />
          </Animated.View>
        </View>
      </TouchableWithoutFeedback>

      {/* 답변영역 */}
      <Animated.View
        style={[
          styles.answer,
          {
            height: interpolateAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
          },
        ]}
      >
        <Text style={styles.answerText}>{item.a}</Text>
      </Animated.View>
    </View>
  );
};

const Collapse = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {collapseData.map((item, index) => (
        <CollapseItem key={index} item={item} />
      ))}
    </SafeAreaView>
  );
};

export default Collapse;

const styles = StyleSheet.create({
  question: {
    color: 'yellow',
    fontWeight: 'bold',
    fontSize: 16,
    flexShrink: 1,
  },
  answer: {
    paddingHorizontal: 40,
    justifyContent: 'center',
    borderBottomColor: '#4c5ced',
    borderBottomWidth: 0.5,
  },
  answerText: {
    fontSize: 14,
  },
  questionContainer: {
    backgroundColor: '#4c5ced',
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  iconContainer: {
    flexShrink: 1,
    marginLeft: 10,
  },
  safeArea: {
    flex: 1,
  },
});
