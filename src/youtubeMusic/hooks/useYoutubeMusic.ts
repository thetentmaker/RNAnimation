import { useRef, useState } from 'react';
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';

const useYoutubeMusic = () => {
  const scrollStartRef = useRef(0);
  const headerAnim = useRef(new Animated.Value(0)).current;
  const showHeaderRef = useRef(true);
  const headerBgAnim = useRef(new Animated.Value(0)).current;

  const onScrollBeginDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    scrollStartRef.current = y;
  };
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - scrollStartRef.current;
    console.log('dy=', dy, scrollStartRef.current);
    // console.log('dy', dy);
    //위로 올라가는 헤더
    if (0 < dy && showHeaderRef.current) {
      headerAnim.setValue(dy);
    }
    // 아래로 내려가는 헤더
    if (-40 < dy && dy < 0 && !showHeaderRef.current) {
      headerAnim.setValue(100 + dy);
    }
    // headerAnim.setValue(dy);
    //헤더 배경 애니메이션
    headerBgAnim.setValue(y);
  };
  const onScrollEndDrag = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const y = e.nativeEvent.contentOffset.y;
    const dy = y - scrollStartRef.current;

    // 위로 올라가는 헤더
    if (0 < dy && showHeaderRef.current) {
      Animated.spring(headerAnim, {
        toValue: 100,
        useNativeDriver: false,
      }).start();

      showHeaderRef.current = false;
    }
    // 아래로 내려가는 헤더
    if (dy < 0 && !showHeaderRef.current) {
      Animated.spring(headerAnim, {
        toValue: 0,
        useNativeDriver: false,
      }).start();

      showHeaderRef.current = true;
    }
  };

  return {
    onScrollBeginDrag,
    onScroll,
    onScrollEndDrag,
    headerAnim,
    headerBgAnim,
  };
};

export default useYoutubeMusic;
