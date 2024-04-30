import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Conversation } from '../interfaces/Conversation';
import { Message } from '../interfaces/Message';
import { getConversation } from '../hooks/conversations/getConversation';

const ConversationHeader = () => {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversation(id);
        console.log('id depuis conversation screen', id);
        
        setConversation(fetchedConversations);
        console.log(fetchedConversations);
        

      } catch (error) {
        console.error('Erreur lors de la récupération des conversations :', error);
      }
    };

    fetchConversations();

  }, []);

  return (
    <View style={styles.container}>
      <View>
        {conversation && (
          <View style={styles.conversationContainer}>
            <Text style={styles.conversationTitle}>{conversation.title}</Text>
            <Text style={styles.conversationDetails}>{conversation.user.username} - {conversation.createdAt}</Text>
          </View>
        )}
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 200,
    flex: 1,
  },
  conversationContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  conversationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  conversationDetails: {
    fontSize: 14,
    color: '#666',
  },
  messageContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  messageContent: {
    fontSize: 16,
  },
  messageDetails: {
    fontSize: 12,
    color: '#888',
  },
});

export default ConversationHeader;
