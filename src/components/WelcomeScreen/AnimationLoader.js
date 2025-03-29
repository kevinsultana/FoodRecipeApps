import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';

export default function AnimationLoader({handlePress}) {
  return (
    <Animated.View
      style={styles.animatedContainer}
      exiting={FadeOutUp.duration(3000).springify()}>
      <Animated.View
        entering={FadeInDown.duration(1000).springify().delay(500)}
        style={styles.topInfoContainer}>
        <Icon name="star" size={hp(2)} color="white" />
        <View style={styles.spacer} />
        <Text style={styles.topTextBold}>60k+</Text>
        <View style={styles.spacer} />
        <Text style={styles.topTextNormal}>Premium Recipes</Text>
      </Animated.View>
      <LinearGradient
        colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 0.91)']}
        style={styles.linearGradient}>
        <Animated.View
          entering={FadeInDown.duration(1000).springify().delay(800)}
          style={styles.titleContainer}>
          <Text style={styles.titleText}>Let's Cooking</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(1000).springify().delay(1100)}
          style={styles.subtitleContainer}>
          <Text style={styles.subtitleText}>Find Best Recipes For You</Text>
        </Animated.View>
        <Animated.View
          entering={FadeInDown.duration(1000).springify().delay(1400)}
          style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonTouchable}
            onPress={handlePress}>
            <View style={styles.buttonInner}>
              <Text style={styles.buttonText}>Start Cooking</Text>
              <Icon name="arrow-forward" size={hp(2)} color="white" />
            </View>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  animatedContainer: {
    flex: 1,
  },
  topInfoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: hp(6),
  },
  spacer: {
    width: wp(2),
  },
  topTextBold: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: hp(2),
  },
  topTextNormal: {
    color: 'white',
    fontWeight: '400',
    fontSize: hp(2),
  },
  linearGradient: {
    marginTop: hp(30),
    height: hp(60),
  },
  titleContainer: {
    marginTop: hp(15),
  },
  titleText: {
    fontSize: hp(7),
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitleContainer: {
    marginTop: hp(1),
  },
  subtitleText: {
    fontSize: hp(2),
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: hp(4),
  },
  buttonTouchable: {
    backgroundColor: 'red',
    padding: wp(4),
    marginHorizontal: wp(25),
    borderRadius: hp(2),
  },
  buttonInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp(3),
  },
  buttonText: {
    fontSize: hp(2),
    fontWeight: '500',
    color: 'white',
    textAlign: 'center',
  },
});
