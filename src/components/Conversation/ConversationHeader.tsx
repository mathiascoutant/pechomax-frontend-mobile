import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Conversation } from '../../interfaces/Conversation';
import { getConversation } from '../../hooks/conversations/getConversation';
import { formatTimeDifference } from '../../hooks/utils';
import { BIG_TEXT_COLOR } from '../../utils/colors';
import CustomBorderBottom from '../CustomBorderBottom';

const ConversationHeader = ({ conversationId }: { conversationId: string }) => {
  const [conversation, setConversation] = useState<Conversation | null>(null);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const fetchedConversations = await getConversation(conversationId);
        console.log('id depuis conversation screen', conversationId);
        
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
            <View style={styles.userWithPicture}>
              <Image style={styles.profilePic} source={{ uri: conversation.user?.profilePic}}/>
              <View>
                <Text style={styles.conversationDetails}>{conversation.user.username} - {formatTimeDifference(conversation.createdAt)}</Text>
                <View style={styles.category}>
                  <Text style={styles.categoryText}>• {conversation.category.name}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.conversationTitle}>{conversation.title}</Text>
          </View>
        )}
      </View>
      <CustomBorderBottom />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1A282B',
  },
  conversationContainer: {
    padding: 10,
  },
  conversationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: BIG_TEXT_COLOR,
  },
  conversationDetails: {
    fontSize: 16,
    color: BIG_TEXT_COLOR,
    fontWeight: '500',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 60,
    marginRight: 20,
    marginTop: 10,
  },
  userWithPicture: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    alignItems: 'flex-end',
  },
  category: {
    backgroundColor: '#c7f9cc',
    borderRadius: 50,
    paddingVertical: 2,
    paddingHorizontal: 8,
    marginTop: 5,
    alignSelf: 'flex-start', 
  },
  categoryText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
});

export default ConversationHeader;
