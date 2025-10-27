import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from '@react-native-vector-icons/material-icons';
import { useEffect, useRef } from 'react';

interface LogoHeaderProps {
  headerAnim: Animated.Value;
}
const LogoHeader = ({ headerAnim }: LogoHeaderProps) => {
  // const headerAnimRef = useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          marginTop: headerAnim.interpolate({
            inputRange: [-40, 0, 100],
            outputRange: [0, 0, -45],
          }),
          opacity: headerAnim.interpolate({
            inputRange: [-40, 0, 20],
            outputRange: [1, 1, 0],
          }),
        }}
      >
        <View
          style={[
            {
              marginHorizontal: 14,
              marginRight: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            },
          ]}
        >
          <Image
            source={require('../../../assets/logo.png')}
            style={{ width: 90, height: 30 }}
          />
          <View style={{ flexDirection: 'row' }}>
            <IconItem name={'cast'} />
            <IconItem name={'search'} />
            <IdentityIcon />
          </View>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {},
});

export default LogoHeader;

const IdentityIcon = () => {
  return (
    <TouchableOpacity>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 45,
          width: 45,
        }}
      >
        <View
          style={{
            height: 30,
            width: 30,
            backgroundColor: '#555',
            borderRadius: 100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Icon name={'perm-identity'} size={20} color="white" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

interface IconItemProps {
  name: React.ComponentProps<typeof Icon>['name'];
}
const IconItem = ({ name }: IconItemProps) => {
  return (
    <TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          height: 45,
          width: 45,
        }}
      >
        <Icon name={name} size={20} color="white" />
      </View>
    </TouchableOpacity>
  );
};
