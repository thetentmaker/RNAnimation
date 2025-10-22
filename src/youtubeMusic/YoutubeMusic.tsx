import { ScrollView, Text, View } from 'react-native';
import HeaderBackground from './components/HeaderBackground';
import CategoryHeader from './components/CategoryHeader';
import LogoHeader from './components/LogoHeader';
import Bottom from './components/Bottom';

const YoutubeMusic = () => {
  return (
    <View style={{ flex: 1 }}>
      <LogoHeader />
      <CategoryHeader />
      <HeaderBackground />
      <ScrollView style={{ flex: 1, borderWidth: 1 }}>
        <View style={{ height: 1000 }}>
          <Text>music list</Text>
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};

export default YoutubeMusic;
