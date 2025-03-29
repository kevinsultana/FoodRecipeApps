import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import YoutubeIframe from 'react-native-youtube-iframe';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function Youtube({data}) {
  const getVideoId = url => {
    const regex = /[?&]v=([^&]*)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
  };

  return (
    <View>
      {data.strYoutube && (
        <View style={styles.containerIngredients}>
          <Text style={styles.title}>{'Recipe Video'}</Text>
          <View style={styles.videoContainer}>
            <YoutubeIframe
              videoId={getVideoId(data.strYoutube)}
              width={wp(90)}
              height={hp(30)}
            />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerIngredients: {
    marginHorizontal: wp(5),
    marginBottom: hp(2),
  },
  title: {
    fontSize: hp(3),
    color: 'black',
    fontWeight: 'bold',
  },
  videoContainer: {
    marginTop: hp(2),
  },
});
