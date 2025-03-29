import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Menu() {
  return (
    <Animated.View
      entering={FadeInDown.duration(300).delay(750).springify()}
      style={styles.menuContainer}>
      <View style={styles.containerMenu}>
        <View style={styles.content}>
          <Icon name="time-outline" size={wp(10)} color="black" />
        </View>
        <Text style={styles.textContent}>35</Text>
        <Text style={styles.bottomTextContent}>Mins</Text>
      </View>
      <View style={styles.containerMenu}>
        <View style={styles.content}>
          <Icon name="person" size={wp(10)} color="black" />
        </View>
        <Text style={styles.textContent}>3</Text>
        <Text style={styles.bottomTextContent}>servings</Text>
      </View>
      <View style={styles.containerMenu}>
        <View style={styles.content}>
          <Icon name="flame" size={wp(10)} color="black" />
        </View>
        <Text style={styles.textContent}>150</Text>
        <Text style={styles.bottomTextContent}>cal</Text>
      </View>
      <View style={styles.containerMenu}>
        <View style={styles.content}>
          <Icon name="book" size={wp(10)} color="black" />
        </View>
        <Text style={styles.textContent}>Easy</Text>
        <Text style={styles.bottomTextContent2}></Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: wp(5),
    marginVertical: wp(4),
  },
  containerMenu: {
    backgroundColor: '#ffb300',
    borderRadius: wp(10),
    padding: wp(2),
    width: wp(18),
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: wp(2),
    borderRadius: wp(10),
    width: wp(14),
    backgroundColor: 'white',
  },
  textContent: {
    marginTop: wp(2),
    fontSize: wp(5),
    color: 'black',
    fontWeight: '600',
  },
  bottomTextContent: {
    marginBottom: wp(2),
    fontSize: wp(3.5),
    color: 'black',
    fontWeight: '400',
  },
  bottomTextContent2: {
    fontSize: wp(3.5),
    color: 'black',
    fontWeight: '400',
    marginBottom: wp(2),
  },
});
