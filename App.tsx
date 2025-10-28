/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import YoutubeMusic from './src/youtubeMusic/YoutubeMusic';
import MobilePay from './src/mobilePay/MobilePay';

function App() {
  return (
    <SafeAreaProvider>
      <MobilePay />
    </SafeAreaProvider>
  );
}

export default App;
