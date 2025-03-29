import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HeroImage({
  data,
  navigation,
  isFavorite,
  handleSaveFavorite,
}) {
  return (
    <Animated.View
      entering={FadeInDown.duration(500).delay(250)}
      style={styles.imageAnimatedContainer}>
      <Image source={{uri: data.strMealThumb}} style={styles.mealImage} />
      <TouchableOpacity
        onPress={navigation}
        style={[styles.actionButton, styles.backButton]}>
        <Icon name="arrow-back" size={wp(8)} color="orange" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleSaveFavorite}
        style={[styles.actionButton, styles.favoriteButton]}>
        <Icon
          name={isFavorite ? 'heart' : 'heart-outline'}
          size={wp(6)}
          color={isFavorite ? 'red' : 'grey'}
        />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  imageAnimatedContainer: {
    marginTop: hp(0.25),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealImage: {
    height: hp(50),
    width: wp(98),
    resizeMode: 'cover',
    borderBottomLeftRadius: wp(10),
    borderBottomRightRadius: wp(10),
    borderRadius: wp(5),
  },
  actionButton: {
    position: 'absolute',
    top: hp(2),
    width: wp(10),
    height: hp(4.5),
    backgroundColor: 'white',
    borderRadius: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    left: wp(5),
  },
  favoriteButton: {
    right: wp(5),
  },
});
