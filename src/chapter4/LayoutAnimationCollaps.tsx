import {
  LayoutAnimation,
  StatusBar,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { collapseData } from '../utils/data';
import { useState } from 'react';

const LayoutAnimationCollaps = () => {
  const [expanded, setExpanded] = useState<number | null>(null);
  const onPress = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(prevState => (prevState === index ? null : index));
  };
  return (
    <>
      <SafeAreaView>
        {collapseData.map((item, index) => (
          <View key={index}>
            {/* 질문 */}
            <TouchableWithoutFeedback onPress={() => onPress(index)}>
              <View
                style={{
                  backgroundColor: '#006aff',
                  padding: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: '##429df5',
                }}
              >
                <Text style={{ color: 'white', fontSize: 15 }}>
                  {index + 1} {item.q}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            {/* 답변 */}
            {expanded === index && (
              <View
                style={{
                  backgroundColor: '#f4f4f4',
                  borderBottomWidth: 1,
                  borderBottomColor: '#ddd',
                  padding: 20,
                  paddingLeft: 40,
                }}
              >
                <Text>{item.a}</Text>
              </View>
            )}
          </View>
        ))}
      </SafeAreaView>
    </>
  );
};

export default LayoutAnimationCollaps;
