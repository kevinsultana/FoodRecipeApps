import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import axios from 'axios';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import HeaderBar from '../components/HeaderBar';
import MansonryImages from '../components/MansonryImages';
import Animated, {SlideInRight} from 'react-native-reanimated';

export default function SurpriseRecipe({navigation, route}) {
  const {mealsSurprise: initialMealsSurprise} = route.params;
  const [mealsSurprise, setMealsSurprise] = useState(initialMealsSurprise);

  const getAdditionalMealsSurprise = async () => {
    try {
      const request = [];
      for (let i = 0; i < 4; i++) {
        request.push(
          axios.get('https://www.themealdb.com/api/json/v1/1/random.php'),
        );
      }
      const responses = await Promise.all(request);
      const additionalMeals = responses.map(response => response.data.meals[0]);
      setMealsSurprise(prevMeals => [...prevMeals, ...additionalMeals]);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
    }
  };

  useEffect(() => {
    getAdditionalMealsSurprise();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar
        navigation={() => navigation.goBack()}
        title="10 Random Recipes"
      />
      <ScrollView>
        <Animated.View entering={SlideInRight.duration(1000)}>
          <MansonryImages
            data={mealsSurprise}
            navigation={item =>
              navigation.navigate('Details', {id: item.idMeal})
            }
          />
        </Animated.View>
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    backgroundColor: 'red',
    padding: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSpacing: {
    height: hp(5),
  },
});
