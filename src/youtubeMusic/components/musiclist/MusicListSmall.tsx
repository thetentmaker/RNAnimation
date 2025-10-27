import {
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import repeat from '../../../utils/Loop';
import { fa, faker } from '@faker-js/faker';
import { useRef } from 'react';
const { width } = Dimensions.get('window');

const MusicListSmall = () => {
  const scrollStartRef = useRef(0);
  const scrollRef = useRef<ScrollView>(null);
  const pageRef = useRef(1);
  return (
    <View>
      <Title />
      <ScrollView
        ref={scrollRef}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={1}
        onScrollBeginDrag={e => {
          const x = e.nativeEvent.contentOffset.x;
          scrollStartRef.current = x;
        }}
        onScrollEndDrag={e => {
          const x = e.nativeEvent.contentOffset.x;
          const dx = x - scrollStartRef.current;
          console.log('dx: ', dx);
          // 오른쪽 page로 붙는 애니메이션
          if (width / 4 < dx && pageRef.current !== 3) {
            console.log('다음 페이지로 넘어가게');
            scrollRef.current?.scrollTo({
              x: width * 0.92 * pageRef.current,
              y: 0,
              animated: true,
            });
            pageRef.current = pageRef.current + 1;
          }
          if (0 < dx && dx < width / 4) {
            console.log('머물기');
            scrollRef.current?.scrollTo({
              x: width * 0.92 * (pageRef.current - 1),
              y: 0,
              animated: true,
            });
          }


          // 왼쪽 page로 붙는 애니메이션
          if (dx < -width / 4 && pageRef.current !== 1) {
            console.log('왼쪽 페이지로 넘어가기');
            scrollRef.current?.scrollTo({
              x: width * 0.92 * (pageRef.current - 2),
              y: 0,
              animated: true,
            });
            pageRef.current = pageRef.current - 1;
          }
          if (-width / 4 < dx && dx < 0) {
            scrollRef.current?.scrollTo({
              x: width * 0.92 * (pageRef.current - 1),
              y: 0,
              animated: true,
            });
          }

        }}
      >
        {repeat(3, index => (
          <View key={index} style={{ width: width * 0.92 }}>
            {repeat(4, index => (
              <MusicListSmallItem key={index} />
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MusicListSmall;

const MusicListSmallItem = () => {
  return (
    <View
      style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 14,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        <Image
          source={{
            uri: `https://picsum.photos/${300 + Math.floor(Math.random() * 6)}`,
          }}
          //   source={{ uri: `https://picsum.photos/${300 + Math.random() * 10}` }}
          style={{ width: 50, height: 50, borderRadius: 2 }}
        />
        <View style={{ marginLeft: 14, justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 10, marginBottom: 6 }}>
            {faker.music.genre()}
          </Text>
          <Text style={{ color: 'white', fontSize: 10 }}>
            {faker.music.songName()}
          </Text>
        </View>
      </View>
      <View style={{ padding: 10 }}>
        <Icon name="more-vert" size={20} color="white" />
      </View>
    </View>
  );
};

const Title = () => {
  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
      <Text style={{ fontSize: 13, color: 'white', fontWeight: '200' }}>
        이 노내로 뮤직 스테이션 시작하기
      </Text>
      <Text style={{ fontWeight: 'bold', fontSize: 28, color: 'white' }}>
        빠른 선곡
      </Text>
    </View>
  );
};
