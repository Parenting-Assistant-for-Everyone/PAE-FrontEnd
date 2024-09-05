// SplashScreen.js
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')} // 로고 이미지를 해당 경로에 저장하세요.
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // 수직 중앙 정렬
    alignItems: 'center', // 수평 중앙 정렬
    backgroundColor: '#ffffff', // 배경 색상 설정
  },
  logo: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
