import AxiosClient from '../axios';

export const getAllUsers = async () => {
  try {
    const response = await AxiosClient.get('/users');
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};