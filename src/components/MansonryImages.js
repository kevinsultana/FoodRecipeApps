import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MansonryList from '@react-native-seoul/masonry-list';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';

export default function MansonryImages({data, navigation}) {
  const ListEmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        <Text>No Recipe available</Text>
      </View>
    );
  };

  const renderItem = ({item, i}) => {
    const isEven = i % 3;
    return (
      <>
        <Pressable key={i} onPress={() => navigation(item)}>
          <Animated.View
            style={styles.animatedContainer}
            entering={FadeInDown.duration(1500)
              .springify()
              .delay(i * 300)}
            exiting={FadeOutUp.duration(500).delay(i * 100)}>
            <Image
              source={{uri: item.strMealThumb}}
              style={[styles.mealImage, {height: isEven ? hp(35) : hp(25)}]}
            />
            <Text style={styles.mealTitle}>
              {item.strMeal.length > 25
                ? item.strMeal.slice(0, 25) + '...'
                : item.strMeal}
            </Text>
          </Animated.View>
        </Pressable>
        <View style={styles.smallSpacing} />
      </>
    );
  };

  return (
    <MansonryList
      data={data || []}
      numColumns={2}
      keyExtractor={item => item.idMeal}
      showsVerticalScrollIndicator={false}
      ListEmptyComponent={ListEmptyComponent}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedContainer: {
    marginHorizontal: wp(3),
  },
  mealImage: {
    width: wp(45),
    borderRadius: wp(5),
    resizeMode: 'cover',
    borderWidth: wp(0.25),
    borderColor: 'grey',
    marginTop: hp(2),
  },
  mealTitle: {
    marginTop: wp(1.5),
    fontSize: wp(3),
    color: 'black',
    fontWeight: '600',
  },
  smallSpacing: {
    height: hp(1),
  },
});
