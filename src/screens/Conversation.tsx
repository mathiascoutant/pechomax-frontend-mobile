import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AddButton from '../components/AddButton';
import { Conversation } from '../interfaces/Conversation';
import { Message } from '../interfaces/Message';
import { getConversation } from '../hooks/conversations/getConversation';
import { getMessagesByConversationId } from '../hooks/conversations/getMessagesByConversationId';

const ConversationScreen = ({ route }) => {
    
  const { id } = route.params; 
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversation(id);
        setConversation(fetchedConversations);

        const fetchedMessages = await getMessagesByConversationId(id);
        setMessages(fetchedMessages);
        
        console.log(fetchedMessages);
        

      } catch (error) {
        console.error('Erreur lors de la récupération des conversations :', error);
      }
    };

    fetchConversations();

  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>
        {conversation && (
          <View style={styles.conversationContainer}>
            <Text style={styles.conversationTitle}>{conversation.title}</Text>
            <Text style={styles.conversationDetails}>{conversation.user.username} - {conversation.createdAt}</Text>
          </View>
        )}

        {messages.map((message) => (
          <View key={message.id} style={styles.messageContainer}>
            <Text style={styles.messageContent}>{message.content}</Text>
            <Text style={styles.messageDetails}>{message.user.username} - {message.created_at}</Text>
          </View>
        ))}
      </ScrollView>

      <AddButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // paddingTop: 200,
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

export default ConversationScreen;
