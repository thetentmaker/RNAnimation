/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PanResponderFontSlider from './src/chapter6/PanResponderFontSlider';
import PanResponderBall from './src/chapter6/PanResponderBall';
import PanResponderModal from './src/chapter6/PanResponderModal';
import PanResponderBannerSlider from './src/chapter6/PanResponderBannerSlider';

function App() {
  return (
    <SafeAreaProvider>
      <PanResponderBall />
    </SafeAreaProvider>
  );
}

export default App;
