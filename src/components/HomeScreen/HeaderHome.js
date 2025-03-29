import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HeaderHome({navigation}) {
  const [favorites, setFavorites] = useState([]);
  const getFavorites = async () => {
    try {
      const favs = await AsyncStorage.getItem('favoriteMeals');
      const parsedFavorites = favs ? JSON.parse(favs) : [];
      setFavorites(parsedFavorites);
    } catch (error) {
      console.log('Error getting favorites:', error);
    }
  };

  useFocusEffect(() => {
    getFavorites();
  });
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitle}>Find best recipes for cooking</Text>
      <TouchableOpacity onPress={navigation} style={styles.favoriteButton}>
        <Icon name="heart-circle" size={hp(6)} color="grey" />
        {favorites?.length > 0 && (
          <View style={styles.favoritesBadgeContainer}>
            <Text style={styles.favoritesBadgeText}>{favorites?.length}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: hp(3),
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    color: 'black',
    width: wp(60),
  },
  favoriteButton: {marginRight: wp(2)},
  favoritesBadgeContainer: {
    position: 'absolute',
    top: 0,
    left: 35,
    backgroundColor: '#ffb429',
    paddingHorizontal: wp(1),
    borderRadius: wp(90),
  },
  favoritesBadgeText: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: hp(1.6),
  },
});
