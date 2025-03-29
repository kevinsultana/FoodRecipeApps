import {View, SafeAreaView, ScrollView, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import HeaderHome from '../components/HomeScreen/HeaderHome';
import SearchBarHome from '../components/HomeScreen/SearchBarHome';
import SurpriseRecipeCard from '../components/HomeScreen/SurpriseRecipeCard';
import CategoryCard from '../components/HomeScreen/CategoryCard';
import MansonryImages from '../components/MansonryImages';

export default function HomeScreen({navigation}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [meals, setMeals] = useState([]);
  const [selectedCaterogies, setSelectedCaterogies] = useState('Beef');
  const [loadingMeal, setLoadingMeal] = useState(false);
  const [show, setShow] = useState(true);

  const getMealsByCategory = async () => {
    setLoadingMeal(true);
    const category = selectedCaterogies;
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,
      );
      setMeals(response.data.meals);
      setLoadingMeal(false);
    } catch (error) {
      setLoadingMeal(false);
      console.error('Error fetching meals by category:', error);
      return [];
    }
  };

  useEffect(() => {
    getMealsByCategory();
  }, [selectedCaterogies]);

  const searchMeals = async text => {
    try {
      const response = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${text}`,
      );
      setMeals(response.data.meals || []);
    } catch (error) {
      console.error('Error searching meals:', error);
    }
  };

  const handleSearch = text => {
    setSearchQuery(text);
    if (text === '') {
      setShow(true);
      getMealsByCategory();
    } else {
      setShow(false);
    }
    setTimeout(() => {
      searchMeals(text);
    }, 1000);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        stickyHeaderIndices={[1]}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <HeaderHome navigation={() => navigation.navigate('Favorite')} />

        {/* Search Bar */}
        <SearchBarHome
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          clearHandleSearch={() => handleSearch('')}
        />

        {show && (
          <>
            <SurpriseRecipeCard
              navigationSurprise={mealsSurprise =>
                navigation.navigate('SurpriseRecipe', {mealsSurprise})
              }
              navigationDetail={id => navigation.navigate('Details', {id})}
            />
            <CategoryCard
              selectedCaterogies={selectedCaterogies}
              setSelectedCaterogies={item =>
                setSelectedCaterogies(item.strCategory)
              }
            />
          </>
        )}

        {/* Meals List */}
        {loadingMeal ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size={'large'} color={'red'} />
          </View>
        ) : (
          <MansonryImages
            data={meals || []}
            navigation={item =>
              navigation.navigate('Details', {id: item.idMeal})
            }
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    backgroundColor: 'white',
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};
