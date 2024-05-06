import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import CatchCard from './CardCatches';
import { BIG_TEXT_COLOR } from '../../../utils/colors';
import CustomBorderBottom from '../../CustomBorderBottom';
import { Catch } from '../../../interfaces/Catch';
import { getSelfCatches } from '../../../hooks/catches/getSelfCatches';

export default function Catches() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [catchesData, setCatchesData] = useState<Catch[]>([]);
  const { height: windowHeight } = Dimensions.get('window');

  const carouselHeight = windowHeight * 0.22;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allCatches = await getSelfCatches();
        const lastTenCatches = allCatches.slice(Math.max(allCatches.length - 10, 0));
        setCatchesData(lastTenCatches);
      } catch (error) {
        console.error('Erreur lors de la récupération des prises :', error);
      }
    };
    fetchData();
  }, []);

  const handleSnapToItem = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <View>
      <Text style={styles.title}>Mes dernières prises</Text>
      {catchesData.length > 0 ? (
        <Carousel
          loop={true}
          height={carouselHeight}
          width={Dimensions.get('window').width}
          data={catchesData}
          renderItem={({ item, index }) => (
            <CatchCard catchData={item} index={index} totalCatches={catchesData.length} />
          )}
          scrollAnimationDuration={1000}
          onSnapToItem={handleSnapToItem}
        />
      ) : (
        <Text style={styles.noCatchesText}>Aucune prise disponible pour le moment. Commencez à pêcher ! 🎣</Text>
      )}
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
  noCatchesText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: BIG_TEXT_COLOR,
    width: '90%',
    left: '5%',
  },
});