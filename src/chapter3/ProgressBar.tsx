import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressBar = () => {
  const onPressRun = () => {
    console.log('run');
  };
  const onPressAutoRun = () => {
    console.log('auto run');
  };
  const onPressReset = () => {
    console.log('reset');
  };
  return (
    <SafeAreaView style={styles.container}>
      <Button title="run" onPress={onPressRun} />
      <Button title="auto run" onPress={onPressAutoRun} />
      <Button title="reset" onPress={onPressReset} />

      {/* ProgressBar Container */}
      <View style={styles.progressBar}>
        {/* ProgressBar 바닥 */}
        <View style={styles.progressBarInner} />
        {/* Progressbar 움직이는 부분 */}
        <View style={styles.progressBarMoving} />
      </View>
    </SafeAreaView>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 300,
  },
  progressBar: {
    position: 'relative',
    margin: 30,
    justifyContent: 'center',
  },
  progressBarInner: {
    backgroundColor: '#222',
    height: 10,
    borderRadius: 10,
  },
  progressBarMoving: {
    backgroundColor: 'blue',
    height: 16,
    position: 'absolute',
    width: '30%',
    borderRadius: 100,
  },
});
