/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import ProgressBar from './src/chapter3/ProgressBar';

function App() {
  return (
    <SafeAreaProvider>
      <ProgressBar />
    </SafeAreaProvider>
  );
}

export default App;
