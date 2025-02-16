import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SafeAreaView>
      <View
        style={{
          paddingVertical: hp(3),
          paddingLeft: wp(5),
          paddingRight: wp(35),
        }}>
        <Text
          style={{
            fontSize: hp(3),
            fontWeight: 'bold',
            color: 'black',
          }}>
          Find best recipes for cooking
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: wp(5),
          paddingVertical: hp(1),
          //   backgroundColor: 'red',
        }}>
        <View
          style={{
            borderWidth: wp(0.25),
            borderColor: 'grey',
            borderRadius: wp(2),
          }}>
          <View
            style={{
              paddingHorizontal: wp(3),
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Icon name="search-outline" size={hp(2)} color="grey" />
            <TextInput
              placeholder="Search Recipes"
              value={searchQuery}
              onChangeText={text => setSearchQuery(text)}
            />
          </View>
        </View>
      </View>
      <View>
        <View
          style={{
            marginTop: hp(1.5),
            marginHorizontal: wp(5),
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: hp(2), fontWeight: 'bold'}}>
            Surprise Recipe 🔥
          </Text>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{color: 'red', fontSize: hp(1.8)}}>See all</Text>
            <View style={{width: wp(1)}} />
            <Icon name="arrow-forward" size={hp(1.5)} color="red" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
