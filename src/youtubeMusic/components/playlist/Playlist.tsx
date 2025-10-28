import { Image, StyleSheet, Text, View } from 'react-native';
import PlaylistFull from './PlaylistFull';
import PlaylistMini from './PlaylistMini';

const Playlist = () => {
  return (
    <>
      <View
        style={{
          backgroundColor: '#222',
          borderBottomColor: '#666',
          borderBottomWidth: 1,
          flexDirection: 'row',
          height: 60,
          alignItems: 'center',
          paddingLeft: 10,
        }}
      >
        <Image
          source={{ uri: 'https://picsum.photos/50' }}
          style={styles.image}
        />
        {/* <PlaylistFull /> */}
        <PlaylistMini />
      </View>
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
  },
  image: {
    width: 50,
    height: 50,
  },
});
