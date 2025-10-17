import { useState } from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  Text,
  UIManager,
  View,
} from 'react-native';

// New Architecture에서는 setLayoutAnimationEnabledExperimental가 no-op입니다
// 실제 프로젝트에서는 react-native-reanimated 사용을 권장합니다
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  try {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  } catch (error) {
    console.log('LayoutAnimation을 활성화할 수 없습니다:', error);
  }
}

// useState update, create, delete 에 따라 LayoutAnimation 어떤/어떻게 인터렉션을 줄 수 있을까?
const LayoutAnimationIntro = () => {
  const [count, setCount] = useState(1);
  const [show, setShow] = useState(true);

  const onButtonPress = () => {
    // LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
    LayoutAnimation.configureNext(
      {
        duration: 500,
        // type: easeIn, spring, linear
        // property: opacity, scaleX, scaleY, scaleXY
        create: {
          type: 'easeIn',
          property: 'opacity',
        },
        update: {
          type: 'spring',
        },
        delete: {
          type: 'linear',
          property: 'opacity',
        },
      },
      () => {},
      () => {},
    );
    setCount(count * 10);
    setShow(!show);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="layout animation 작동!" onPress={onButtonPress} />
      <View style={{ width: 250, height: 250 }}>
        {/* update */}
        <View style={{ backgroundColor: 'orange', marginTop: 10 }}>
          <Text style={{ fontSize: 50 }}>{count}</Text>
        </View>
        {/* create, delete */}
        {show && (
          <View style={{ backgroundColor: 'green', marginTop: 10 }}>
            <Text style={{ fontSize: 30 }}>보이는 컴포넌트</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default LayoutAnimationIntro;
