import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import Animated, {FadeInDown} from 'react-native-reanimated';
import axios from 'axios';

export default function SurpriseRecipeCard({
  navigationSurprise,
  navigationDetail,
}) {
  const [mealsSurprise, setMealsSurprise] = useState([]);
  const getMealsSurprise = async () => {
    try {
      const request = [];
      for (let i = 0; i < 6; i++) {
        request.push(
          axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        );
      }
      const responses = await Promise.all(request);
      const combinedMeals = responses.map(response => response.data.meals[0]);
      setMealsSurprise(combinedMeals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    }
  };

  useEffect(() => {
    getMealsSurprise();
  }, []);

  return (
    <View>
      <View style={styles.surpriseHeaderContainer}>
        {mealsSurprise?.length > 0 && (
          <>
            <Text style={styles.surpriseHeaderText}>Surprise Recipe 🔥</Text>
            <TouchableOpacity
              onPress={() => navigationSurprise(mealsSurprise)}
              style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See all</Text>
              <View style={styles.seeAllSpacer} />
              <Icon name="arrow-forward" size={hp(1.5)} color="red" />
            </TouchableOpacity>
          </>
        )}
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mealsSurprise?.map((item, index) => (
          <Pressable key={index} onPress={() => navigationDetail(item.idMeal)}>
            <Animated.View
              entering={FadeInDown.duration(1000)
                .springify()
                .delay(index * 500)}
              style={styles.surpriseItemContainer}
              key={index}>
              <Image
                source={{uri: item.strMealThumb}}
                style={styles.surpriseItemImage}
              />
              <View style={styles.surpriseItemTextContainer}>
                <Text style={styles.surpriseItemTitle}>
                  {item.strMeal.length > 30
                    ? item.strMeal.slice(0, 30) + '...'
                    : item.strMeal}
                </Text>
                <Text style={styles.surpriseItemCountry}>
                  Country: {item.strArea}
                </Text>
              </View>
            </Animated.View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  surpriseHeaderContainer: {
    marginTop: hp(1.5),
    marginHorizontal: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  surpriseHeaderText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: 'black',
  },
  seeAllButton: {flexDirection: 'row', alignItems: 'center'},
  seeAllText: {color: 'red', fontSize: hp(1.8)},
  seeAllSpacer: {width: wp(1)},
  surpriseItemContainer: {
    marginTop: hp(1.5),
    marginHorizontal: wp(4),
  },
  surpriseItemImage: {
    width: wp(75),
    height: hp(25),
    borderRadius: wp(5),
    resizeMode: 'cover',
    borderWidth: wp(0.25),
    borderColor: 'grey',
  },
  surpriseItemTextContainer: {
    marginTop: wp(2),
    marginLeft: wp(3),
  },
  surpriseItemTitle: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'black',
  },
  surpriseItemCountry: {
    marginTop: wp(1),
    fontSize: wp(3),
    fontWeight: '500',
    color: 'black',
  },
});
