import { useState } from 'react';
import { PanResponder, Text, View } from 'react-native';

const PanResponderIntro = () => {
  const [status, setStatus] = useState({
    dx: 0, // 터치 후 누적거리
    dy: 0,
    moveX: 0, // 제일 최근에 찍힌 좌표(절대좌표)
    moveY: 0,
    vx: 0, // 제스처의 속도
    vy: 0,
    x0: 0, // 터치 시작지점
    y0: 0,
  });
  const panResponder = PanResponder.create({
    // permisson method
    onStartShouldSetPanResponder: (event, gestureState) => true,
    onMoveShouldSetPanResponder: (event, gestureState) => true,
    // response method
    onPanResponderGrant: (event, gestureState) => {},
    onPanResponderReject(e, gestureState) {},
    // handler method
    onPanResponderStart: (event, gestureState) => {
      console.log('onPanResponderStart: ', gestureState);
      setStatus({ ...status, x0: gestureState.x0, y0: gestureState.y0 });
    },
    onPanResponderMove: (event, gestureState) => {
      console.log('onPanResponderMove: ', gestureState);
      setStatus(prev => ({
        ...gestureState,
        x0: status.x0,
        y0: status.y0,
      }));
    },
    onPanResponderEnd: (event, gestureState) => {
      console.log('onPanResponderEnd: ', gestureState);
    },
  });
  const moveXSize = Math.floor(status.moveX - status.x0);
  const moveYSize = Math.floor(status.moveY - status.y0);
  return (
    <View
      {...panResponder.panHandlers}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffa100',
      }}
    >
      <View>
        {moveXSize > 0 ? (
          <Text>{Math.abs(moveXSize)}만큼 오른쪽으로 가는 중</Text>
        ) : (
          <Text>{Math.abs(moveXSize)}만큼 왼쪽으로 가는 중</Text>
        )}
        {moveYSize > 0 ? (
          <Text>{Math.abs(moveYSize)}만큼 아래쪽으로 가는 중</Text>
        ) : (
          <Text>{Math.abs(moveYSize)}만큼 위쪽으로 가는 중</Text>
        )}
      </View>
      <View style={{ position: 'absolute', bottom: 70, left: 10 }}>
        <Text>dx: {status.dx}</Text>
        <Text>dy: {status.dy}</Text>
        <Text>moveX: {status.moveX}</Text>
        <Text>moveY: {status.moveY}</Text>
        <Text>vx: {status.vx}</Text>
        <Text>vy: {status.vy}</Text>
        <Text>x0: {status.x0}</Text>
        <Text>y0: {status.y0}</Text>
      </View>
    </View>
  );
};

export default PanResponderIntro;
