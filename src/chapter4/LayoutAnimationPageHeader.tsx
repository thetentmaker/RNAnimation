import { useState } from 'react';
import {
  LayoutAnimation,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/material-icons';

const LayoutAnimationPageHeader = () => {
  const [expanded, setExpanded] = useState(true);
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    console.log(event.nativeEvent.contentOffset.y);
    const y = event.nativeEvent.contentOffset.y;
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (y < 10) {
      setExpanded(false);
    } else {
      setExpanded(true);
    }
  };
  return (
    <>
      <StatusBar barStyle="light-content" />
      {/* 스크롤이 되는 높이를 측정을 해야함 */}
      <ScrollView
        onScroll={e => onScroll(e)}
        scrollEventThrottle={1}
        contentContainerStyle={{ height: 1000 }}
      >
        {expanded ? (
          <View style={{ backgroundColor: '#333' }}>
            <SafeAreaView style={{ flexDirection: 'row' }}>
              <View
                style={{
                  backgroundColor: '#222',
                  marginLeft: 20,
                  width: 60,
                  height: 60,
                  borderRadius: 60,
                  marginBottom: -10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Icon name="person" size={30} color="#888" />
              </View>
              <View>
                <View style={{ height: 8 }} />
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  개발자 도디
                </Text>
                <View style={{ height: 2 }} />
                <Text style={{ color: 'white', fontSize: 13 }}>
                  힘이 들면 힘을 내야지!
                </Text>
              </View>
            </SafeAreaView>
          </View>
        ) : (
          <>
            <View
              style={{
                backgroundColor: '#333',
                height: 250,
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  position: 'absolute',
                  bottom: -100,
                  alignItems: 'center',
                }}
              >
                <View
                  style={{
                    backgroundColor: '#222',
                    width: 160,
                    height: 160,
                    borderRadius: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Icon name="person" size={100} color="#888" />
                </View>
                <Text
                  style={{ fontSize: 20, marginTop: 20, fontWeight: 'bold' }}
                >
                  개발자 도디
                </Text>
                <Text style={{ fontSize: 14, marginTop: 10 }}>
                  힘이 들면 힘을 내야지!
                </Text>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </>
  );
};

export default LayoutAnimationPageHeader;
