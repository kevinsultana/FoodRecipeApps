import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function HeaderBar({navigation, title, favoriteLength = 0}) {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={navigation}>
        <Icon name="arrow-back" size={hp(3)} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerText}>{title}</Text>
      {favoriteLength > 0 && <View style={{flex: 1}} />}
      {favoriteLength > 0 && (
        <Text style={styles.headerText}>
          {favoriteLength} {favoriteLength > 1 ? 'Meals' : 'Meal'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'red',
    padding: hp(2),
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: hp(2),
    fontWeight: 'bold',
    color: 'white',
    marginLeft: wp(2),
  },
});
