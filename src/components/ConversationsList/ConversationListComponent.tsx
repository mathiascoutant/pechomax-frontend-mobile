import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { BIG_TEXT_COLOR, PRIMARY_COLOR, TEXT_COLOR } from '../../utils/colors';
import { formatTimeDifference } from '../../hooks/utils';
import { BACKGROUND_COLOR } from '../../utils/colors';
import { Conversation } from '../../interfaces/Conversation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/Navigation';

const ConversationsListComponent = ({
    filteredConversations, 
    showMore,
    handleShowMore,
    navigation,
    sortBy,
    toggleSortOrder 
}: { 
    filteredConversations: Conversation[]
    showMore: boolean
    handleShowMore: () => void
    navigation: NativeStackNavigationProp<RootStackParamList>
    sortBy: string
    toggleSortOrder: () => void }) => {
      
  return (
    <ScrollView>
      <Text style={styles.title}>Conversations entre pêcheurs</Text>
      <View style={styles.container}>
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.headerText}>Titre</Text>
            <Text style={styles.headerText}>Créateur</Text>
            <Text style={styles.headerText}>Catégorie</Text>
            <TouchableOpacity onPress={toggleSortOrder} style={styles.dateFilter}>
              <Text style={styles.headerText}>Date de création</Text>
              <FontAwesomeIcon icon={sortBy === 'asc' ? faChevronUp : faChevronDown}/>
            </TouchableOpacity>
          </View>

          {filteredConversations.map((conversation, index) => (
            <TouchableOpacity key={index} style={styles.tableRow} onPress={() => navigation.navigate('Conversation', { id: conversation.id })}>
              <Text style={styles.rowText}>{conversation.title}</Text>
              <Text style={styles.rowText}>{conversation.user.username}</Text>
              <Text style={styles.rowText}>{conversation.category.name}</Text>
              <Text style={styles.rowText}>{formatTimeDifference(conversation.createdAt)}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {showMore && (
          <TouchableOpacity style={styles.seeMoreButton} onPress={handleShowMore}>
            <Text>Voir plus</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '2%',
    backgroundColor: BACKGROUND_COLOR,
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
  dateFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '25%',
  },
});

export default ConversationsListComponent;
