import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Catch } from '../../../interfaces/Catch';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR, TEXT_COLOR } from '../../../utils/colors';

interface CatchCardProps {
  catchData: Catch;
  index: number;
  totalCatches: number;
}

const CatchCard: React.FC<CatchCardProps> = ({ catchData, index, totalCatches }) => {
  return (
    <View style={styles.cardContainer}>
      <Image style={styles.picture} source={{ uri: catchData.pictures[0] }} />
      <View style={styles.fishDescriptionContainer}>
        <View>
          <Text style={styles.fishSpecies}>{catchData.species.name}</Text>
          <Text style={styles.fishDescriptionText}>{catchData.description}</Text>
        </View>
        <View>
          <View style={styles.fishDimensions}>
            <Text style={styles.fishDimension}>{catchData.length} cm,</Text>
            <Text style={styles.fishDimension}>{catchData.weight} kg</Text>
          </View>
          <Text style={styles.catchDateAndLoc}>Pêché à {catchData.localisation ?? 'Lieu non défini'},</Text>
          <Text style={styles.catchDateAndLoc}>Le {catchData.date.toString()}</Text>
        </View>
      </View>
      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{index + 1}/{totalCatches}</Text>
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
        width: '45%',
        height: '90%',
        borderTopRightRadius: 20,
        borderBottomRightRadius: 20,
        margin: 10,
        left: 0,
      },
      cardContainer: {
        backgroundColor: BACKGROUND_COLOR,
        flexDirection: 'row',
        borderRightWidth: 1,
        borderRightColor: TEXT_COLOR,
        height: '90%',
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
        color: BIG_TEXT_COLOR,
      },
      fishDimensions: {
        flexDirection: 'row',
        gap: 5,
      },
      fishDimension: {
        fontWeight: 'bold',
        color: TEXT_COLOR,
      },
      fishDescriptionText: {
        textAlign: 'justify',
        color: TEXT_COLOR,
      },
      catchDateAndLoc: {
        fontSize: 12,
        color: TEXT_COLOR,
      },
      counterContainer: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        padding: 5,
        borderRadius: 100,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      counterText: {
        color: TEXT_COLOR,
      },
});

export default CatchCard;