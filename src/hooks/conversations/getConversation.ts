import AxiosClient from '../../hooks/axios';

export const getConversation = async (id: string) => {
  try {
    const response = await AxiosClient.get(`/conversations/${id}`);
    return response.data;
  } catch (error) {    
    console.error(error);
    return null;
  }
};