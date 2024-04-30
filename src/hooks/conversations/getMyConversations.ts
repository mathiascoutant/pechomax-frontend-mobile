import AxiosClient from '../../hooks/axios';

export const getMyConversations = async () => {
  try {
    const response = await AxiosClient.get(`/conversations/self`);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
