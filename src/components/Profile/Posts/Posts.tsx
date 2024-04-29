import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Conversation } from '../../../interfaces/Conversation'; 
import fakeConversations from '../../../data/conversationsData'; 

export default function Posts() {

  return (
    <View>
      <Text style={styles.title}>Mes posts</Text>            
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Titre</Text>
            <Text style={styles.headerText}>Catégorie</Text>
            <Text style={styles.headerText}>Date de création</Text>
          </View>
          {fakeConversations.map((conversation: Conversation, index: number) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.rowText}>{conversation.title}</Text>
              <Text style={styles.rowText}>{conversation.categoryId}</Text>
              <Text style={styles.rowText}>{conversation.createdAt}</Text>
            </View>
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