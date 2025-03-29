import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {SlideInRight} from 'react-native-reanimated';

export default function RecipeCard({meal, openDeleteModal, navigation, index}) {
  return (
    <Animated.View
      entering={SlideInRight.duration(500)
        .delay(index * 200)
        .springify()}>
      <Pressable key={meal.idMeal} onPress={navigation}>
        <View style={styles.favoriteItemContainer}>
          <Image source={{uri: meal.strMealThumb}} style={styles.mealImage} />
          <TouchableOpacity
            onPress={() => openDeleteModal(meal.idMeal)}
            style={styles.trashContainer}>
            <View style={styles.trashIcon}>
              <Icon name="trash" size={hp(3)} color="red" />
            </View>
          </TouchableOpacity>
          <View style={styles.mealInfoContainer}>
            <Text style={styles.mealTitle}>{meal.strMeal}</Text>
            <Text style={styles.mealArea}>{meal.strArea}</Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  favoriteItemContainer: {
    marginHorizontal: wp(2),
    marginBottom: hp(1.5),
    borderWidth: wp(0.3),
    borderColor: 'grey',
    borderRadius: wp(3),
  },
  mealImage: {
    width: wp(90),
    height: hp(30),
    marginTop: hp(1),
    resizeMode: 'cover',
    alignSelf: 'center',
    borderRadius: wp(3),
    borderWidth: wp(0.3),
    borderColor: 'grey',
  },
  trashContainer: {
    position: 'absolute',
    top: hp(2),
    right: wp(5),
  },
  trashIcon: {
    backgroundColor: 'white',
    padding: wp(2),
    borderRadius: wp(5),
  },
  mealInfoContainer: {
    marginVertical: hp(1),
    marginLeft: wp(2),
  },
  mealTitle: {
    fontSize: hp(2.5),
    fontWeight: 'bold',
    color: 'black',
  },
  mealArea: {
    fontSize: hp(1.5),
    fontWeight: '400',
    color: 'black',
  },
});
