/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import YoutubeMusic from './src/youtubeMusic/YoutubeMusic';

function App() {
  return (
    <SafeAreaProvider>
      <YoutubeMusic />
    </SafeAreaProvider>
  );
}

export default App;
