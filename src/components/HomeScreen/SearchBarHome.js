import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function SearchBarHome({
  searchQuery,
  handleSearch,
  clearHandleSearch,
}) {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBox}>
        <View style={styles.searchInputContainer}>
          <Icon name="search-outline" size={hp(2)} color="grey" />
          <TextInput
            placeholder="Search Recipes"
            value={searchQuery}
            onChangeText={handleSearch}
            style={styles.searchTextInput}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={clearHandleSearch}>
              <Icon name="close-outline" size={hp(2.5)} color="grey" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    backgroundColor: 'white',
  },
  searchBox: {
    borderWidth: wp(0.25),
    borderColor: 'grey',
    borderRadius: wp(2),
  },
  searchInputContainer: {
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchTextInput: {flex: 1},
});
