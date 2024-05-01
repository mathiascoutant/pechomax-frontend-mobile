import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import AddButton from '../components/AddButton';
import { Conversation } from '../interfaces/Conversation';
import { Message } from '../interfaces/Message';
import { getConversation } from '../hooks/conversations/getConversation';
import { getMessagesByConversationId } from '../hooks/conversations/getMessagesByConversationId';
import { formatDate } from '../hooks/utils';
import ConversationHeader from '../components/Conversation/ConversationHeader';
import ConversationMessages from '../components/Conversation/ConversationMessages';
import ConversationAddMessage from '../components/Conversation/ConversationAddMessage';

const ConversationScreen = ({ route }) => {
  const { id } = route.params; 
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [messagesToShow, setMessagesToShow] = useState<number>(10);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversation(id);
        setConversation(fetchedConversations);

        const fetchedMessages = await getMessagesByConversationId(id);
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Erreur lors de la récupération des conversations :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConversations();
  }, []);

  const loadMoreMessages = () => {
    setMessagesToShow(prevMessagesToShow => prevMessagesToShow + 10);
  };

  const handleMessageSubmit = async () => {
    try {
      const updatedMessages = await getMessagesByConversationId(id);
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Erreur lors de la récupération des messages mis à jour :', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ConversationHeader conversationId={id} /> 
        {loading ? (
          <Text style={styles.loadingText}>Chargement en cours...</Text>
        ) : messages.length === 0 ? (
          <Text style={styles.noMessagesText}>Aucun message à afficher.</Text>
        ) : (
          <>
            {messages.slice(0, messagesToShow).map((message) => (
              <ConversationMessages key={message.id} message={message} />
            ))}
            {messages.length > messagesToShow && (
              <TouchableOpacity style={styles.loadMoreButton} onPress={loadMoreMessages}>
                <Text style={styles.loadMoreButtonText}>Charger plus de messages</Text>
              </TouchableOpacity>
            )}
          </>
        )}
      </ScrollView>
      <AddButton />
      <ConversationAddMessage conversationId={id} onSubmit={handleMessageSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A282B',
  },
  loadingText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  noMessagesText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  loadMoreButton: {
    backgroundColor: '#c7f9cc',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loadMoreButtonText: {
    fontWeight: 'bold',
  },
});

export default ConversationScreen;
