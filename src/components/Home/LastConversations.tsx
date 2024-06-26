import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Conversation } from '../../interfaces/Conversation'; 
import { getConversations } from '../../hooks/conversations/getConversations';
import { formatDate, formatTimeDifference } from '../../hooks/utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { BIG_TEXT_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';

export default function LastConversations() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [visibleConversations, setVisibleConversations] = useState<Conversation[]>([]);

  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversations();
        fetchedConversations.sort((a: { createdAt: Date; }, b: { createdAt: Date; }) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        setConversations(fetchedConversations);
        setVisibleConversations(fetchedConversations.slice(0, 10));
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations :', error);
      }
    };

    if (isFocused) {
      fetchConversations();
    }
  }, [isFocused]);

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
              <Text style={styles.rowText}>{formatTimeDifference(conversation.createdAt)}</Text>
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
