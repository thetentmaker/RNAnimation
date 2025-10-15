/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import DrawerMenu from './src/chapter3/DrawerMenu';

function App() {
  return (
    <SafeAreaProvider>
      <DrawerMenu />
    </SafeAreaProvider>
  );
}

export default App;
