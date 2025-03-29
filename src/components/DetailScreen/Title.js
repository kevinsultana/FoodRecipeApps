import {StyleSheet, Text} from 'react-native';
import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Title({data}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(500)}
      style={styles.titleContainer}>
      <Text style={styles.titleText}>{data.strMeal}</Text>
      <Text style={styles.subtitleText}>{data.strArea}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    marginTop: hp(2),
    marginHorizontal: wp(5),
  },
  titleText: {
    fontSize: hp(3),
    color: 'black',
    fontWeight: 'bold',
  },
  subtitleText: {
    fontSize: hp(1.5),
    color: 'black',
    fontWeight: '400',
  },
});
