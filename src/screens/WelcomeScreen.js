import {SafeAreaView} from 'react-native';
import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import ImageBackground from '../components/WelcomeScreen/ImageBackground';
import AnimationLoader from '../components/WelcomeScreen/AnimationLoader';

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
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground />
      {!hideScreen && <AnimationLoader handlePress={handlePress} />}
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
};
