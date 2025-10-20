import { Text, TouchableWithoutFeedback, View } from 'react-native';
import repeat from '../utils/Loop';
import { useState } from 'react';

const BOX_SIZE = 50;
const CIRCLE_SIZE = 10;
const FONT = [
  {
    title: { fontSize: 20, lineHeight: 32 },
    body: { fontSize: 12 },
  },
  {
    title: { fontSize: 24, lineHeight: 38 },
    body: { fontSize: 14 },
  },
  {
    title: { fontSize: 30, lineHeight: 40 },
    body: { fontSize: 15 },
  },
  {
    title: { fontSize: 35, lineHeight: 50 },
    body: { fontSize: 19 },
  },
];

const PanResponderFontSlider = () => {
  const [step, setStep] = useState(0);
  const onPress = (index: number) => () => {
    setStep(index);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View
        style={{
          borderWidth: 1,
          width: 200,
          height: 150,
          justifyContent: 'flex-end',
        }}
      >
        {/* text step view */}
        <View>
          <Text style={FONT[step].title}>Font Step {step + 1}</Text>
          <Text style={FONT[step].body}>font body style</Text>
        </View>
        {/* slider 영역 */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          {/* 가로선 */}
          <View
            style={{
              position: 'absolute',
              height: 1,
              top: 24.5,
              width: BOX_SIZE * 3,
              borderBottomColor: '#ddd',
              borderBottomWidth: 1,
            }}
          />
          {/* 세로 회색 동그라미 */}
          <View style={{ flexDirection: 'row' }}>
            {repeat(4, index => (
              <TouchableWithoutFeedback key={index} onPress={onPress(index)}>
                <View
                  style={{
                    width: BOX_SIZE,
                    height: BOX_SIZE,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      width: 10,
                      height: 10,
                      backgroundColor: '#ddd',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
          <View
            style={{
              width: 20,
              height: 20,
              backgroundColor: '#333',
              position: 'absolute',
              left: BOX_SIZE / 2 - CIRCLE_SIZE / 2 + step * BOX_SIZE,
              borderRadius: CIRCLE_SIZE,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default PanResponderFontSlider;
