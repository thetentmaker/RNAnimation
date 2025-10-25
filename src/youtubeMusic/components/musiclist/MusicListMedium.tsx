import { faker } from '@faker-js/faker';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import repeat from '../../../utils/Loop';
import Icon from '@react-native-vector-icons/material-icons';
import { useMemo } from 'react';
const { width } = Dimensions.get('window');
const MusicListMedium = () => {
  return (
    <View>
      <Title />
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 10 }}
        showsHorizontalScrollIndicator={false}
      >
        {repeat(7, index => (
          <View key={index} style={styles.musicListMediumItemContainer}>
            <MusicListMediumItem />
            <MusicListMediumItem />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default MusicListMedium;

const MusicListMediumItem = () => {
  const imgSize = useMemo(() => width / 4, []);
  return (
    <View>
      <Image
        source={{
          uri: `https://picsum.photos/${300 + Math.floor(Math.random() * 10)}`,
        }}
        style={{ width: imgSize, height: imgSize, borderRadius: 2 }}
      />
      <View
        style={[
          styles.musicListMediumItemImageContainer,
          { width: imgSize, height: imgSize },
        ]}
      >
        <Icon
          style={styles.playIcon}
          name="play-arrow"
          size={28}
          color="white"
        />
      </View>
      <Text
        style={[
          styles.musicListMediumItemTitle,
          {
            width: width / 4,
          },
        ]}
        numberOfLines={2}
      >
        {faker.music.songName()}
      </Text>
    </View>
  );
};
const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>다시듣기</Text>
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
  musicListMediumItemTitle: {
    fontSize: 13,
    color: 'white',
    marginTop: 5,
    marginBottom: 10,
    height: 70,
  },
  musicListMediumItemContainer: {
    marginRight: 20,
  },
  playIcon: {
    position: 'absolute',
  },
  musicListMediumItemImageContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
