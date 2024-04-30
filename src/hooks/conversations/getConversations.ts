import AxiosClient from '../../hooks/axios';

export const getConversations = async () => {
  try {
    const response = await AxiosClient.get('/conversations');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};