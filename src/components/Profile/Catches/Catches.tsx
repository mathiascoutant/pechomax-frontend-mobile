import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { catches } from '../../../data/catchesData';
import Carousel from 'react-native-reanimated-carousel';
import CatchCard from './CardCatches';
import { BIG_TEXT_COLOR } from '../../../utils/colors';
import CustomBorderBottom from '../../CustomBorderBottom';

export default function Catches() {

  const [currentIndex, setCurrentIndex] = useState(0);

  // Dimensions de l'écran
  const { height: windowHeight } = Dimensions.get('window');

  // Hauteur du Carousel à 35% de la hauteur de la page
  const carouselHeight = windowHeight * 0.22;

  const handleSnapToItem = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View >
      <Text style={styles.title}>Mes prises</Text>            
      <Carousel
        loop={true}
        height={carouselHeight} // Utilisation de la hauteur calculée
        width={Dimensions.get('window').width}
        data={catches}
        renderItem={({ item, index }) => (
          <CatchCard catchData={item} index={index} totalCatches={catches.length} />
        )}
        scrollAnimationDuration={1000}
        onSnapToItem={handleSnapToItem}
      />
      <CustomBorderBottom />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    paddingTop: '5%',
    paddingLeft: '3%',
    color: BIG_TEXT_COLOR,
  },
});
