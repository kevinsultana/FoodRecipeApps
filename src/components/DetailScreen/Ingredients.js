import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Ingredients({data}) {
  const ingredientsIndex = data => {
    if (!data) return [];
    let indexes = [];
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        indexes.push(i);
      }
    }
    return indexes;
  };
  return (
    <Animated.View
      entering={FadeInDown.duration(300).delay(1000).springify()}
      style={styles.containerIngredients}>
      <Text style={styles.title}>{'Ingredients'}</Text>
      <View style={styles.ingredientsMargin}>
        {ingredientsIndex(data).map((item, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.bullet} />
            <View style={styles.spacer} />
            <Text style={styles.ingredientMeasure}>
              {data[`strMeasure${item}`]}
            </Text>
            <View style={styles.spacer} />
            <Text style={styles.ingredientName}>
              {data[`strIngredient${item}`]}
            </Text>
          </View>
        ))}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  containerIngredients: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3),
    color: 'black',
    fontWeight: 'bold',
  },
  ingredientsMargin: {
    marginTop: hp(2),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bullet: {
    width: wp(3),
    height: hp(1.5),
    backgroundColor: 'orange',
    borderRadius: wp(5),
  },
  spacer: {
    width: wp(3),
  },
  ingredientMeasure: {
    fontWeight: 'bold',
    fontSize: hp(2),
    color: 'black',
  },
  ingredientName: {
    fontWeight: '400',
    fontSize: hp(2),
    color: 'black',
  },
});
