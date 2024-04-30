import AxiosClient from '../../hooks/axios';
import { Message } from '../../interfaces/Message';

export const getMessagesByConversationId = async (conversationId: string): Promise<Message[]> => {
  try {
    const response = await AxiosClient.get(`/conversations/${conversationId}/messages`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des messages :', error);
    return [];
  }
};
