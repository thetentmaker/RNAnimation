import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from '@react-native-vector-icons/material-icons';
import { faker } from '@faker-js/faker';

const PlaylistMini = () => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{faker.music.genre()}</Text>
        <Text style={styles.text}>{faker.music.songName()}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => {
            console.log('play');
          }}
        >
          <View style={styles.button}>
            <Icon name="play-arrow" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log('skip next');
          }}
        >
          <View style={styles.button}>
            <Icon name="skip-next" size={24} color="white" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    color: 'white',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginLeft: 14,
  },
});

export default PlaylistMini;
