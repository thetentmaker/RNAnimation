import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Dimensions,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@react-native-vector-icons/ionicons';
import { useRef } from 'react';

// 우측 상단에 메뉴 버튼 추가
const DrawerMenu = () => {
  const interpolateAnim = useRef(new Animated.Value(0)).current;
  const width = Dimensions.get('window').width;
  const onPressOpen = () => {
    Animated.timing(interpolateAnim, {
      toValue: 1,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
    console.log('Menu pressed');
  };
  const onPressHide = () => {
    Animated.timing(interpolateAnim, {
      toValue: 0,
      easing: Easing.out(Easing.circle),
      useNativeDriver: false,
    }).start();
    console.log('Menu pressed');
  };

  return (
    <>
      {/* HOME */}
      <View style={styles.container}>
        <SafeAreaView style={styles.safeArea}>
          <TouchableHighlight
            onPress={onPressOpen}
            underlayColor="#ffffff50"
            style={styles.menuButton}
          >
            <View style={styles.menuButtonContent}>
              <Ionicons name="menu-outline" size={30} color="#222" />
            </View>
          </TouchableHighlight>
        </SafeAreaView>
      </View>

      {/* BACKDROP, Menu BG */}
      <TouchableWithoutFeedback onPress={onPressHide}>
        <Animated.View
          style={[
            styles.backdrop,
            {
              width: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '2000%'],
              }),
              backgroundColor: interpolateAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['#00000000', '#00000090'],
              }),
              //   zIndex: interpolateAnim.interpolate({
              //     inputRange: [0, 1],
              //     outputRange: [0, 2],
              //   }),
            },
          ]}
        />
      </TouchableWithoutFeedback>

      {/* DRAWER MENU */}
      <Animated.View
        style={[
          styles.menuContainer,
          {
            transform: [
              {
                translateX: interpolateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [width * -0.9, 0],
                }),
              },
            ],
          },
        ]}
      >
        <SafeAreaView style={styles.menuContainerContent}>
          <View>
            <Text style={styles.menuItem}>MENU</Text>
            <Text style={styles.menuItem}>MENU</Text>
            <Text style={styles.menuItem}>MENU</Text>
          </View>
          <View>
            <TouchableHighlight
              onPress={onPressHide}
              underlayColor="#aff10050"
              style={styles.menuButton}
            >
              <View style={styles.menuButtonContent}>
                <Ionicons name="close" size={30} color="#222" />
              </View>
            </TouchableHighlight>
          </View>
        </SafeAreaView>
      </Animated.View>
    </>
  );
};

export default DrawerMenu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#aff100',
  },
  safeArea: {
    alignItems: 'flex-end',
  },
  menuButton: {
    borderRadius: 100,
  },
  menuButtonContent: {
    padding: 14,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    width: '90%',
    height: '100%',
    backgroundColor: 'white',
    zIndex: 2,
  },
  menuTitle: {
    fontSize: 22,
    padding: 10,
  },
  menuContainerContent: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  menuItem: {
    fontSize: 22,
    padding: 10,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
});
