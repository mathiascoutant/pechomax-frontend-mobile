import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Catch } from '../../../interfaces/Catch';

interface CatchCardProps {
  catchData: Catch;
  index: number;
  totalCatches: number;
}

const CatchCard: React.FC<CatchCardProps> = ({ catchData, index, totalCatches }) => {
  return (
    <View style={styles.cardContainer}>
      <Image style={styles.picture} source={{ uri: catchData.pictures ? catchData.pictures : 'https://previews.123rf.com/images/maxstudioo/maxstudioo2302/maxstudioo230200232/199253471-poissons-dr%C3%B4les-sur-fond-gris-illustration-3d-haute-r%C3%A9solution.jpg' }} />
      <View style={styles.fishDescriptionContainer}>
        <View>
          <Text style={styles.fishSpecies}>{catchData.speciesId}</Text>
          <Text style={styles.fishDescriptionText}>{catchData.description}</Text>
        </View>
        <View>
          <View style={styles.fishDimensions}>
            <Text style={styles.fishDimension}>{catchData.length} cm,</Text>
            <Text style={styles.fishDimension}>{catchData.weight} kg</Text>
          </View>
          <Text style={styles.catchDateAndLoc}>Pêché à {catchData.localisation ?? 'Inconnue'},</Text>
          <Text style={styles.catchDateAndLoc}>Le {catchData.date}</Text>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <Text>{index + 1}/{totalCatches}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
      catch: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      picture: {
        width: 200,
        height: 150,
        borderRadius: 50,
        margin: 10,
        left: 0,
      },
      cardContainer: {
        width: '100%',
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: 'black',
      },
      fishDescriptionContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingRight: '2%',
        justifyContent: 'space-between',
        paddingVertical: '1%',
      },
      fishSpecies: {
        fontSize: 20,
        fontWeight: '600',
      },
      fishDimensions: {
        flexDirection: 'row',
        gap: 5,
      },
      fishDimension: {
        fontWeight: 'bold',
      },
      fishDescriptionText: {
        textAlign: 'justify',
      },
      catchDateAndLoc: {
        fontSize: 12,
      },
      counterContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 5,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
});

export default CatchCard;