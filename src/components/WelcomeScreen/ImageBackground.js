import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ImageBackground() {
  return (
    <Image source={require('../../assets/bgFood.png')} style={styles.image} />
  );
}

const styles = StyleSheet.create({
  image: {
    width: wp('100%'),
    height: hp('100%'),
    position: 'absolute',
    resizeMode: 'cover',
  },
});
