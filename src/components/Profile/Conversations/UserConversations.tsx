import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Conversation } from '../../../interfaces/Conversation'; 
import { getMyConversations } from '../../../hooks/conversations/getMyConversations';
import { formatDate } from '../../../hooks/utils';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

export default function UserConversations() {
  type ProfileScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  const [conversations, setConversations] = React.useState<Conversation[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const myConversations = await getMyConversations();
        setConversations(myConversations);
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations :', error);
      }
    };

    fetchConversations();
  }, []);


  return (
    <View>
      <Text style={styles.title}>Mes posts</Text>            
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Titre</Text>
            <Text style={styles.headerText}>Créateur</Text>
            <Text style={styles.headerText}>Catégorie</Text>
            <Text style={styles.headerText}>Date de création</Text>
          </View>
          {conversations.map((conversation: Conversation, index: number) => (
          <TouchableOpacity key={index} style={styles.tableRow} onPress={() => navigation.navigate('Conversation', {id: conversation.id})}>
            <Text style={styles.rowText}>{conversation.title}</Text>
            <Text style={styles.rowText}>{conversation.user.username}</Text>
            <Text style={styles.rowText}>{conversation.category.name}</Text>
            <Text style={styles.rowText}>{formatDate(conversation.createdAt)}</Text>
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
});
