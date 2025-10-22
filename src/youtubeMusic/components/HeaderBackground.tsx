import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface HeaderBackgroundProps {
  selectedCategory: number | undefined;
}
const HeaderBackground = ({
  selectedCategory,
}: {
  selectedCategory: number | undefined;
}) => {
  return (
    <View
      style={{
        position: 'absolute',
        height: 350,
        width: '100%',
        // backgroundColor: '#222',
      }}
    >
      {selectedCategory === undefined ? (
        <LinearGradient
          start={{ x: 0.7, y: 0.25 }}
          end={{ x: 0.5, y: 1.0 }}
          locations={[0, 0.3, 0.6, 1]}
          colors={['#ffa10050', '#28bf4b20', '#11111190', '#111111']}
          style={{ opacity: 0.4, height: 350 }}
        />
      ) : (
        <>
          {console.log(selectedCategory)}
          <Image
            source={{ uri: `https://picsum.photos/30${selectedCategory}` }}
            style={{ width: '100%', height: 300 }}
          />
          <LinearGradient
            start={{ x: 0.5, y: 0.1 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 0.9]}
            colors={['#11111100', '#111111']}
            style={{
              position: 'absolute',
              height: 350,
              width: '100%',
            }}
          />
        </>
      )}
    </View>
  );
};

export default HeaderBackground;
