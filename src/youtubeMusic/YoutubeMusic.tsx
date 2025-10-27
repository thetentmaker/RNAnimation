import { ScrollView, View, StyleSheet } from 'react-native';
import { useRef, useState } from 'react';
import HeaderBackground from './components/header/HeaderBackground';
import CategoryHeader from './components/header/CategoryHeader';
import LogoHeader from './components/header/LogoHeader';
import Bottom from './components/bottom/Bottom';
import MusicListMedium from './components/musiclist/MusicListMedium';
import MusicListLarge from './components/musiclist/MusicListLarge';
import MusicListSmall from './components/musiclist/MusicListSmall';
import useYoutubeMusic from './hooks/useYoutubeMusic';

const YoutubeMusic = () => {
  const [selectedCategory, setSelectedCategory] = useState<number | undefined>(
    undefined,
  );
  const { onScrollBeginDrag, onScrollEndDrag, onScroll, headerAnim } =
    useYoutubeMusic();
  const renderCount = useRef(0);
  ++renderCount.current;
  console.log('renderCount', renderCount.current);
  return (
    <View style={styles.container}>
      <HeaderBackground selectedCategory={selectedCategory} />
      <LogoHeader headerAnim={headerAnim} />
      <CategoryHeader
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ScrollView
        style={styles.scrollView}
        scrollEventThrottle={16}
        onScrollBeginDrag={onScrollBeginDrag}
        onScrollEndDrag={onScrollEndDrag}
        onScroll={onScroll}
      >
        <View style={styles.contentContainer}>
          <MusicListSmall />
          <MusicListMedium />
          <MusicListLarge />
        </View>
      </ScrollView>
      <Bottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    marginBottom: 100,
  },
});

export default YoutubeMusic;
