import { ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import HeaderBackground from './components/header/HeaderBackground';
import CategoryHeader from './components/header/CategoryHeader';
import LogoHeader from './components/header/LogoHeader';
import Bottom from './components/bottom/Bottom';
import MusicListMedium from './components/musiclist/MusicListMedium';
import MusicListLarge from './components/musiclist/MusicListLarge';
import MusicListSmall from './components/musiclist/MusicListSmall';

const YoutubeMusic = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  return (
    <View style={{ flex: 1, backgroundColor: '#111' }}>
      <HeaderBackground selectedCategory={selectedCategory} />
      <LogoHeader />
      <CategoryHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ScrollView style={{ flex: 1, borderWidth: 1 }}>
        <View style={{ marginBottom: 100 }}>
          <MusicListSmall />
          <MusicListMedium />
          <MusicListLarge />
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};

export default YoutubeMusic;
