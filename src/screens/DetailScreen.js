import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeroImage from '../components/DetailScreen/HeroImage';
import Title from '../components/DetailScreen/Title';
import Menu from '../components/DetailScreen/Menu';
import Ingredients from '../components/DetailScreen/Ingredients';
import Instruction from '../components/DetailScreen/Instruction';
import Youtube from '../components/DetailScreen/Youtube';
import Toast from 'react-native-toast-message';

export default function DetailScreen({navigation, route}) {
  const {id} = route.params;

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const getMealDetail = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );
      setData(response.data.meals[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getMealDetail();
  }, []);

  const handleSaveFavorite = async meal => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favoriteMeals');
      let favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      const isAlreadyFavorite = favorites.some(
        item => item.idMeal === meal.idMeal,
      );
      if (isAlreadyFavorite) {
        favorites = favorites.filter(item => item.idMeal !== meal.idMeal);
        Toast.show({
          type: 'success',
          text1: 'Meal removed from favorites',
          topOffset: hp(2),
        });
      } else {
        favorites.push(meal);
        Toast.show({
          type: 'success',
          text1: 'Meal added to favorites',
          topOffset: hp(2),
        });
      }
      await AsyncStorage.setItem('favoriteMeals', JSON.stringify(favorites));
      setIsFavorite(!isAlreadyFavorite);
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error saving favorite',
        topOffset: hp(2),
      });
      console.log('Error saving favorite:', error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      const existingFavorites = await AsyncStorage.getItem('favoriteMeals');
      const favorites = existingFavorites ? JSON.parse(existingFavorites) : [];
      const isFav = favorites.some(item => item.idMeal === data.idMeal);
      setIsFavorite(isFav);
    } catch (error) {
      console.log('Error checking favorite:', error);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="red" />
          </View>
        ) : (
          <>
            <HeroImage
              data={data}
              navigation={() => navigation.goBack()}
              isFavorite={isFavorite}
              handleSaveFavorite={() => handleSaveFavorite(data)}
            />
            <Title data={data} />
            <Menu />
            <Ingredients data={data} />
            <Instruction data={data} />
            <Youtube data={data} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    height: hp(100),
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
