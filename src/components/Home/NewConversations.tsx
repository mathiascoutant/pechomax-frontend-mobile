import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Conversation } from '../../interfaces/Conversation'; 
import { getConversations } from '../../hooks/conversations/getConversations';
import { formatDate } from '../../hooks/utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

export default function NewConversations() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [visibleConversations, setVisibleConversations] = useState<Conversation[]>([]);
  const [showMore, setShowMore] = useState<boolean>(true);

  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations();
        setConversations(fetchedConversations);
        setVisibleConversations(fetchedConversations.slice(0, 10));
        if (fetchedConversations.length <= 10) {
          setShowMore(false);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations :', error);
      }
    };

    fetchConversations();

    return () => {
      setShowMore(false);
    };
  }, []);

  const handleShowMore = () => {
    const remainingConversations = conversations.slice(visibleConversations.length);
    const nextBatch = remainingConversations.slice(0, 10);
    setVisibleConversations(prevState => [...prevState, ...nextBatch]);
    if (remainingConversations.length <= 10) {
      setShowMore(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Derniers posts</Text>            
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Titre</Text>
            <Text style={styles.headerText}>Créateur</Text>
            <Text style={styles.headerText}>Catégorie</Text>
            <Text style={styles.headerText}>Date de création</Text>
          </View>
          {visibleConversations.map((conversation: Conversation, index: number) => (
            <TouchableOpacity key={index} style={styles.tableRow} onPress={() => navigation.navigate('Conversation', {id: conversation.id})}>
              <Text style={styles.rowText}>{conversation.title}</Text>
              <Text style={styles.rowText}>{conversation.user.username}</Text>
              <Text style={styles.rowText}>{conversation.category.name}</Text>
              <Text style={styles.rowText}>{formatDate(conversation.createdAt)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {showMore && (
          <TouchableOpacity style={styles.seeMoreButton} onPress={handleShowMore}>
            <Text>Voir plus</Text>
          </TouchableOpacity>
        )}
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
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
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
    borderBottomColor: '#000',
  },
  rowText: {
    flex: 1,
    textAlign: 'center',
  },
  seeMoreButton: {
    backgroundColor: '#c7f9cc',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});