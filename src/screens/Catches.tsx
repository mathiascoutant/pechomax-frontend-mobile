import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, VirtualizedList } from 'react-native';
import { Catch } from '../interfaces/Catch';
import { getSelfCatches } from '../hooks/catches/getSelfCatches';
import { formatTimeDifference } from '../hooks/utils';
import { BACKGROUND_COLOR, BIG_TEXT_COLOR, TEXT_COLOR } from '../utils/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';
import AddButton from '../components/AddButton';

export default function UserCatchesPage() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

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

  const renderCatchItem = ({ item }: { item: Catch }) => (
    <TouchableOpacity style={styles.catchItem} onPress={() => navigation.navigate('CatchDetails', { id: item.id })}>
      <Image source={{ uri: item.pictures?.[0] }} style={styles.catchImage} />
      <View style={styles.catchDetails}>
        <Text style={[styles.species, styles.littleText]}>{item.species.name}</Text>
        <Text style={[styles.dimensions, styles.littleText]}>{item.length} cm - {item.weight} kg</Text>
        <Text style={styles.date}>{formatTimeDifference(item.createdAt)}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vos prises</Text>
      {userCatches.length > 0 ? (
        <VirtualizedList
          data={userCatches}
          renderItem={renderCatchItem}
          keyExtractor={(item) => item.id.toString()}
          getItemCount={() => userCatches.length}
          getItem={(data, index) => data[index]}
        />
      ) : (
        <Text style={styles.noCatchesMessage}>Vous n'avez pas encore enregistré de prise.</Text>
      )}
      <AddButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingTop: 20,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: BIG_TEXT_COLOR,
  },
  littleText: {
    color: TEXT_COLOR,
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
    color: TEXT_COLOR,
  },
});
