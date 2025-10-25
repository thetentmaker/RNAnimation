import { Dimensions, Image, ScrollView, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import repeat from '../../../utils/Loop';
import { fa, faker } from '@faker-js/faker';
const { width } = Dimensions.get('window');

const MusicListSmall = () => {
  return (
    <View>
      <Title />
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {repeat(3, index => (
          <View key={index} style={{ width: width * 0.9 }}>
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
