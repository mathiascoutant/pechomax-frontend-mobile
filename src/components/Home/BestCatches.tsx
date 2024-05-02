import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { formatTimeDifference, isWithinWeek } from '../../hooks/utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BIG_TEXT_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';
import { getAllCatches } from '../../hooks/catches/getAllCatches';
import { Catch } from '../../interfaces/Catch';

export default function BestCatchesOfTheWeek() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const [bestCatches, setBestCatches] = useState<Catch[]>([]);
  const [visibleBestCatches, setVisibleBestCatches] = useState<Catch[]>([]);

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchBestCatches = async () => {
        try {
            const allCatches = await getAllCatches();
            const bestCatchesOfWeek = allCatches.filter((catchItem: Catch) => {
                const catchDate = new Date(catchItem.date);
                return isWithinWeek(catchDate) && catchItem.pointValue > 0;
            });
            bestCatchesOfWeek.sort((a: { pointValue: number; }, b: { pointValue: number; }) => b.pointValue - a.pointValue);
            setBestCatches(bestCatchesOfWeek);
            setVisibleBestCatches(bestCatchesOfWeek.slice(0, 10));
        } catch (error) {
            console.error('Erreur lors de la récupération des meilleures prises de la semaine :', error);
        }
    };
  
    if (isFocused) {
      fetchBestCatches();
    }

  }, [isFocused]);
  
  return (
    <View>
      <Text style={styles.title}>Meilleures prises de la semaine</Text>            
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Photo</Text>
            <Text style={styles.headerText}>Espèce</Text>
            <Text style={styles.headerText}>Taille / Poids</Text>
            <Text style={styles.headerText}>Pêcheur</Text>
            <Text style={styles.headerText}>Pêché</Text>
          </View>
        {visibleBestCatches.map((catchItem: Catch, index: number) => (
            <TouchableOpacity key={index} style={styles.tableRow} onPress={() => navigation.navigate('Conversation', {id: catchItem.id})}>
                <Image source={{ uri: catchItem.pictures && catchItem.pictures[0] || 'https://images.rtl.fr/~c/2000v2000/rtl/www/1294273-un-poisson-clown-illustration.jpg' }} style={{ width: 50, height: 50 }} />
                <Text style={styles.rowText}>{catchItem.species.name}</Text>
                <View>
                    <Text style={styles.rowText}>{catchItem.length} cm</Text>
                    <Text style={styles.rowText}>{catchItem.weight} kg</Text>
                </View>
                <Text style={styles.rowText}>{catchItem.user.username}</Text>
                <Text style={styles.rowText}>{formatTimeDifference(catchItem.date)}</Text>
            </TouchableOpacity>
        ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: '2%',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    paddingTop: '5%',
    paddingLeft: '3%',
    color: BIG_TEXT_COLOR,
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: TEXT_COLOR,
    borderRadius: 5,
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: TEXT_COLOR,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: BIG_TEXT_COLOR,
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
    color: TEXT_COLOR,
  },
  seeMoreButton: {
    backgroundColor: PRIMARY_COLOR,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});
