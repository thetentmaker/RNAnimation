import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { faker } from '@faker-js/faker';
import { Dimensions, Image } from 'react-native';
import { useMemo } from 'react';
import repeat from '../../../utils/Loop';
const { width } = Dimensions.get('window');
const MusicListLarge = () => {
  return (
    <View>
      <Title />
      <ScrollView
        horizontal
        contentContainerStyle={styles.scrollViewContentContainer}
        showsHorizontalScrollIndicator={false}
      >
        {repeat(10, index => (
          <View key={index} style={styles.musicListLargeItemContainer}>
            <MusicListLargeItem />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MusicListLarge;

const MusicListLargeItem = () => {
  const imgSize = useMemo(() => width / 2.5, []);
  return (
    <View>
      <Image
        source={{
          uri: `https://picsum.photos/${300 + Math.floor(Math.random() * 10)}`,
        }}
        style={{ width: imgSize, height: imgSize, borderRadius: 4 }}
      />
      <Text
        style={{
          fontSize: 13,
          width: width / 2.5,
          color: 'white',
          marginTop: 5,
          marginBottom: 10,
          height: 60,
        }}
      >
        {faker.music.songName()}
      </Text>
    </View>
  );
};
const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <View style={styles.fastRewindContainerContainer}>
        <View style={styles.fastRewindContainer}>
          <Icon name="fast-rewind" size={20} color="#999" />
        </View>
        <Text style={styles.title}>다시듣기</Text>
      </View>

      <View style={styles.moreContainer}>
        <Text style={styles.more}>더보기</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    paddingHorizontal: 10,
    paddingVertical: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  more: {
    fontSize: 12,
    color: 'white',
    fontWeight: '200',
  },
  moreContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 100,
  },
  fastRewindContainer: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 100,
    marginRight: 10,
    padding: 3,
  },
  fastRewindContainerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scrollViewContentContainer: {
    paddingHorizontal: 10,
  },
  musicListLargeItemContainer: {
    marginRight: 20,
  },
});
