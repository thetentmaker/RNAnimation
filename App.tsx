/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import PanResponderModal from './src/chapter6/PanResponderModal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <PanResponderModal />
    </SafeAreaProvider>
  );
}

export default App;
