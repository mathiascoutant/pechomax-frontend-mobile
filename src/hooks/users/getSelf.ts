import AxiosClient from '../../hooks/axios';

export const getSelf = async () => {
  try {
    const response = await AxiosClient.get('/users/self');
    return response.data;
  } catch (error) {      
    return null;
  }
};