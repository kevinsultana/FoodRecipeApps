import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Instruction({data}) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Instruction'}</Text>
      <View style={styles.textMargin}>
        <Text style={styles.instructionText}>{data.strInstructions}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3),
    color: 'black',
    fontWeight: 'bold',
  },
  textMargin: {
    marginTop: hp(2),
  },
  instructionText: {
    fontSize: hp(1.6),
    color: 'black',
    fontWeight: '400',
  },
});
