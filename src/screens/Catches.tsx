import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Catch } from '../interfaces/Catch';
import { getSelfCatches } from '../hooks/catches/getSelfCatches';
import { formatTimeDifference } from '../hooks/utils';

export default function UserCatchesPage() {
  const [userCatches, setUserCatches] = useState<Catch[]>([]);

  useEffect(() => {
    const fetchUserCatches = async () => {
      try {
        const catches = await getSelfCatches(); 
        setUserCatches(catches);
      } catch (error) {
        console.error('Erreur lors de la récupération des prises du user :', error);
      }
    };

    fetchUserCatches();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos prises</Text>
      {userCatches.length > 0 ? (
        <FlatList
          data={userCatches}
          renderItem={({ item }) => (
            <View style={styles.catchItem}>
              <Image source={{ uri: item.pictures && item.pictures[0] }} style={styles.catchImage} />
              <View style={styles.catchDetails}>
                <Text style={styles.species}>{item.species.name}</Text>
                <Text style={styles.dimensions}>{item.length} cm - {item.weight} kg</Text>
                <Text style={styles.date}>{formatTimeDifference(item.date)}</Text>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      ) : (
        <Text style={styles.noCatchesMessage}>Vous n'avez pas encore enregistré de prise.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  catchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  catchImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  catchDetails: {
    flex: 1,
  },
  species: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  dimensions: {
    fontSize: 16,
  },
  date: {
    fontSize: 14,
    color: '#888',
  },
  noCatchesMessage: {
    fontSize: 18,
    fontStyle: 'italic',
  },
});
