import { ScrollView, Text, View } from 'react-native';
import HeaderBackground from './components/HeaderBackground';
import CategoryHeader from './components/CategoryHeader';
import LogoHeader from './components/LogoHeader';
import Bottom from './components/Bottom';
import { useState } from 'react';

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
        <View style={{ height: 1000 }}>
          <Text>music list</Text>
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};

export default YoutubeMusic;
