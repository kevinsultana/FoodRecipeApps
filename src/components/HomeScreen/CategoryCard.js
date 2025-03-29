import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Animated, {FadeInDown} from 'react-native-reanimated';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import axios from 'axios';
import {CachedImage} from '../../cache/imageCache';

export default function CategoryCard({
  setSelectedCaterogies,
  selectedCaterogies,
}) {
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const response = await axios.get(
        'https://www.themealdb.com/api/json/v1/1/categories.php',
      );
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <View style={styles.categoryHeaderContainer}>
        {categories?.length > 0 && (
          <Text style={styles.categoryHeaderText}>Popular Category</Text>
        )}
      </View>
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories?.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setSelectedCaterogies(item)}>
              <Animated.View
                entering={FadeInDown.duration(1000)
                  .springify()
                  .delay(index * 200)}
                style={styles.categoryItemContainer}
                key={index}>
                <CachedImage
                  uri={item.strCategoryThumb}
                  style={[
                    styles.categoryImage,
                    item.strCategory === selectedCaterogies
                      ? styles.categoryImageSelected
                      : styles.categoryImageDefault,
                  ]}
                />
                <Text style={styles.categoryItemText}>{item.strCategory}</Text>
              </Animated.View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  categoryHeaderContainer: {
    marginHorizontal: wp(5),
    marginTop: wp(4),
  },
  categoryHeaderText: {
    fontSize: wp(4),
    fontWeight: 'bold',
    color: 'black',
  },
  categoryItemContainer: {
    marginTop: hp(2),
    marginHorizontal: wp(2.5),
    alignItems: 'center',
  },
  categoryImage: {
    width: wp(18),
    height: wp(18),
    borderRadius: wp(15),
    resizeMode: 'cover',
  },
  categoryImageSelected: {
    borderWidth: wp(0.75),
    borderColor: 'red',
  },
  categoryImageDefault: {
    borderWidth: wp(0.5),
    borderColor: 'grey',
  },
  categoryItemText: {
    marginTop: wp(1),
    fontSize: wp(3),
    color: 'black',
    fontWeight: '500',
  },
});
