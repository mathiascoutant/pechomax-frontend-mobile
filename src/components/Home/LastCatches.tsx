import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { formatDate, formatTimeDifference } from '../../hooks/utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BIG_TEXT_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';
import { getAllCatches } from '../../hooks/catches/getAllCatches';
import { Catch } from '../../interfaces/Catch';

export default function LastCacthes() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const [catches, setCatches] = useState<Catch[]>([]);
  const [visibleCatches, setVisibleCatches] = useState<Catch[]>([]);

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchCatches = async () => {
      try {
        const fetchedCatches = await getAllCatches();
        fetchedCatches.sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setCatches(fetchedCatches);
        setVisibleCatches(fetchedCatches.slice(0, 10));
      } catch (error) {
        console.error('Erreur lors de la récupération des prises :', error);
      }
    };

    if (isFocused) {
      fetchCatches();
    }
  }, [isFocused]);

  return (
    <View>
      <Text style={styles.title}>Dernières prises</Text>            
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Photo</Text>
            <Text style={styles.headerText}>Espèce</Text>
            <Text style={styles.headerText}>Dimensions</Text>
            <Text style={styles.headerText}>Pêcheur</Text>
            <Text style={styles.headerText}>Pêché</Text>
          </View>
        {visibleCatches.map((conversation: Catch, index: number) => (
            <TouchableOpacity key={index} style={styles.tableRow} onPress={() => navigation.navigate('Conversation', {id: conversation.id})}>
                <Image source={{ uri: conversation.pictures && conversation.pictures[0] || 'https://images.rtl.fr/~c/2000v2000/rtl/www/1294273-un-poisson-clown-illustration.jpg' }} style={{ width: 50, height: 50 }} />
                <Text style={styles.rowText}>{conversation.species.name}</Text>
                <View>
                    <Text style={styles.rowText}>{conversation.length} cm</Text>
                    <Text style={styles.rowText}>{conversation.weight} kg</Text>
                </View>
                <Text style={styles.rowText}>{conversation.user.username}</Text>
                <Text style={styles.rowText}>{formatTimeDifference(conversation.date)}</Text>
            </TouchableOpacity>
        ))}
        </View>
      </View>
    </View>
  );
}

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
