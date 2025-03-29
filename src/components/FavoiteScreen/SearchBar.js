import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function SearchBar({searchQuery, handleSearch, clearSearch}) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchInputContainer}>
        <View style={styles.searchIcon}>
          <Icon name="search" size={hp(2)} color="grey" />
        </View>
        <TextInput
          value={searchQuery}
          onChangeText={handleSearch}
          placeholder="Search"
          style={styles.searchTextInput}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity
            style={styles.clearIconContainer}
            onPress={clearSearch}>
            <Icon name="close" size={hp(2)} color="grey" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    height: hp(5),
    marginHorizontal: wp(5),
    marginVertical: hp(2),
    backgroundColor: 'white',
    borderWidth: wp(0.3),
    borderColor: 'grey',
    borderRadius: wp(3),
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchIcon: {
    position: 'absolute',
    left: wp(2),
  },
  searchTextInput: {
    marginLeft: wp(6),
    flex: 1,
  },
  clearIconContainer: {
    position: 'absolute',
    right: wp(2),
  },
});
