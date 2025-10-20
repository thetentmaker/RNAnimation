/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import PanResponderBannerSlider from './src/chapter6/PanResponderBannerSlider';

function App() {
  return (
    <SafeAreaProvider>
      <PanResponderBannerSlider />
    </SafeAreaProvider>
  );
}

export default App;
