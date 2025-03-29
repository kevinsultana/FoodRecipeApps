import React, {useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import ModalDelete from '../components/FavoiteScreen/ModalDelete';
import RecipeCard from '../components/FavoiteScreen/RecipeCard';
import SearchBar from '../components/FavoiteScreen/SearchBar';
import HeaderBar from '../components/HeaderBar';
import {heightPercentageToDP} from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';

export default function Favorite({navigation}) {
  const [favorites, setFavorites] = useState([]);
  const [rawFavorites, setRawFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedMealId, setSelectedMealId] = useState(null);

  const getFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favoriteMeals');
      const parsedFavorites = favs ? JSON.parse(favs) : [];
      setFavorites(parsedFavorites);
      setRawFavorites(parsedFavorites);
    } catch (error) {
      console.log('Error getting favorites:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getFavorites();
    }, []),
  );

  const handleSearch = text => {
    setSearchQuery(text);
    if (text) {
      const filteredFavorites = rawFavorites.filter(meal =>
        meal.strMeal.toLowerCase().includes(text.toLowerCase()),
      );
      setFavorites(filteredFavorites);
    } else {
      setFavorites(rawFavorites);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFavorites(rawFavorites);
  };

  const deleteFavorite = async mealId => {
    try {
      const updatedFavorites = rawFavorites.filter(
        meal => meal.idMeal !== mealId,
      );
      await AsyncStorage.setItem(
        'favoriteMeals',
        JSON.stringify(updatedFavorites),
      );
      setFavorites(updatedFavorites);
      setRawFavorites(updatedFavorites);
    } catch (error) {
      console.error('Error deleting favorite:', error);
    }
  };

  const confirmDelete = () => {
    if (selectedMealId) {
      deleteFavorite(selectedMealId);
      setSelectedMealId(null);
      setModalVisible(false);
      Toast.show({
        type: 'success',
        text1: 'Deleted successfully',
        topOffset: heightPercentageToDP(2),
      });
    }
  };

  const openDeleteModal = mealId => {
    setSelectedMealId(mealId);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <HeaderBar
        navigation={() => navigation.goBack()}
        title="Favorite Meals"
        favoriteLength={favorites.length}
      />
      {/* Searchbar */}
      <SearchBar
        clearSearch={clearSearch}
        searchQuery={searchQuery}
        handleSearch={handleSearch}
      />
      {/* List menu favorite */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {favorites.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Image source={require('../assets/favoriteListEmpty.jpg')} />
            <Text style={styles.emptyText}>Your Favorite list is empty</Text>
          </View>
        ) : (
          favorites.map((meal, index) => (
            <RecipeCard
              key={meal.idMeal}
              meal={meal}
              index={index}
              openDeleteModal={openDeleteModal}
              navigation={() =>
                navigation.navigate('Details', {id: meal.idMeal})
              }
            />
          ))
        )}
      </ScrollView>
      {/* Modal Confirmation */}
      <ModalDelete
        modalVisible={modalVisible}
        confirmDelete={confirmDelete}
        onRequestClose={() => setModalVisible(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: heightPercentageToDP(70),
  },
  emptyText: {
    fontSize: heightPercentageToDP(2),
    color: 'grey',
  },
});
