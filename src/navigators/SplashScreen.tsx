import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

import colors from '../assets/colors/colors';
const splashScreen = require('../assets/images/logo.png');

const styles = StyleSheet.create({
  loadingAnimation: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  imageLoading: {
    marginBottom: 40,
    width: 220,
    height: 220,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  container: {
    flexGrow: 1,
    height: '100%',
    justifyContent: 'space-between',
    padding: 40,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  logo: {
    height: '100%',
    justifyContent: 'center',
  },
});

const SplashScreen = () => {
  return (
    <SafeAreaView >
      <StatusBar
        animated={true}
        backgroundColor={colors.white100}
        barStyle={'dark-content'}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={styles.loadingAnimation}
      >
        <View style={styles.container}>
          <View style={styles.logo}>
            <Image source={splashScreen} style={styles.imageLoading} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default SplashScreen;
