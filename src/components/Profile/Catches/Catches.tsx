import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { catches } from '../../../data/catchesData';
import Carousel from 'react-native-reanimated-carousel';
import CatchCard from './CardCatches';

export default function Catches() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const PAGE_WIDTH = Dimensions.get('window').width;

  const handleSnapToItem = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Mes prises</Text>            
        <Carousel
          loop={true}
          height={170}
          width={PAGE_WIDTH}
          data={catches}
          renderItem={({ item, index }) => (
            <CatchCard catchData={item} index={index} totalCatches={catches.length} />
          )}
          scrollAnimationDuration={1000}
          onSnapToItem={handleSnapToItem}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    paddingTop: '5%',
    paddingLeft: '3%',
  },
});