import {View, Text, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Animated, {FadeInDown, FadeOutUp} from 'react-native-reanimated';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

export default function WelcomeScreen({navigation}) {
  const [hideScreen, setHideScreen] = useState(false);

  const handlePress = () => {
    setHideScreen(true);
    setTimeout(() => {
      navigation.navigate('Home');
    }, 500);
  };

  useFocusEffect(
    React.useCallback(() => {
      setHideScreen(false);
    }, []),
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        source={require('../assets/bgFood.png')}
        style={{
          width: wp('100%'),
          height: hp('100%'),
          position: 'absolute',
          resizeMode: 'contain',
        }}
      />
      {/* Hanya render konten jika hideScreen false.
          Saat hideScreen true, komponen akan menjalankan exit animation */}
      {!hideScreen && (
        <Animated.View
          style={{flex: 1}}
          // Terapkan exit animation pada seluruh konten
          exiting={FadeOutUp.duration(3000).springify()}
          // Setelah exit animation selesai, navigasi ke HomeScreen
        >
          <Animated.View
            entering={FadeInDown.duration(1000).springify()}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'row',
              marginTop: hp(6),
            }}>
            <Icon name="star" size={hp(2)} color="white" />
            <View style={{width: wp(2)}} />
            <Text style={{color: 'white', fontWeight: 'bold', fontSize: hp(2)}}>
              60k+
            </Text>
            <View style={{width: wp(2)}} />
            <Text style={{color: 'white', fontWeight: '400', fontSize: hp(2)}}>
              Premium Recipes
            </Text>
          </Animated.View>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0, 0, 0, 0.91)']}
            style={{marginTop: hp(30), height: hp(60)}}>
            <Animated.View
              entering={FadeInDown.duration(1000).springify().delay(300)}
              style={{marginTop: hp(14)}}>
              <Text
                style={{
                  fontSize: hp(8),
                  fontWeight: 'bold',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Let's Cooking
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify().delay(600)}
              style={{marginTop: hp(1)}}>
              <Text
                style={{
                  fontSize: hp(2),
                  fontWeight: '500',
                  color: 'white',
                  textAlign: 'center',
                }}>
                Find Best Recipes For You
              </Text>
            </Animated.View>
            <Animated.View
              entering={FadeInDown.duration(1000).springify().delay(900)}
              style={{marginTop: hp(4)}}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  padding: hp(2),
                  marginHorizontal: wp(25),
                  borderRadius: hp(2),
                }}
                onPress={() => {
                  // Saat tombol ditekan, set hideScreen true untuk memicu exit animation
                  handlePress();
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginHorizontal: wp(3),
                  }}>
                  <Text
                    style={{
                      fontSize: hp(2),
                      fontWeight: '500',
                      color: 'white',
                      textAlign: 'center',
                    }}>
                    Start Cooking
                  </Text>
                  <Icon name="arrow-forward" size={hp(2)} color="white" />
                </View>
              </TouchableOpacity>
            </Animated.View>
          </LinearGradient>
        </Animated.View>
      )}
    </SafeAreaView>
  );
}
