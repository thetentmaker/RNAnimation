/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Collapse from './src/chapter3/Collapse';

function App() {
  return (
    <SafeAreaProvider>
      <Collapse />
    </SafeAreaProvider>
  );
}

export default App;
