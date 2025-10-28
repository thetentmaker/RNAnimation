import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';

const { width: screenWidth } = Dimensions.get('window');
const cardWidth = screenWidth * 0.7;
const cardHeight = screenWidth * 0.7 * 0.58;

const CARDS = [
  {
    color: '#aaa',
  },
  {
    color: '#bbb',
  },
  {
    color: '#ccc',
  },
  {
    color: '#ddd',
  },
  {
    color: '#eee',
  },
  {
    color: '#f2f2f2',
  },
];

const MobilePay = () => {
  const { width, height } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <View
        style={{
          position: 'relative',
          width: width * 0.7,
          height: width * 0.7 * 0.58 + (CARDS.length - 1) * 20,
        }}
      >
        {CARDS.map((card, index) => (
          <View
            key={index}
            style={{
              position: 'absolute',
              backgroundColor: card.color,
              width: width * 0.7,
              height: width * 0.7 * 0.58,
              marginTop: index * 20,
              borderRadius: 15,
              // iOS shadow
              shadowColor: '#000',
              shadowOffset: {
                width: -3,
                height: -3,
              },
              shadowOpacity: 0.2,
              shadowRadius: 10,
              // Android shadow
              elevation: 5,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default MobilePay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
