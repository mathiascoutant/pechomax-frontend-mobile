import AxiosClient from '../axios';

export const getAllUsers = async () => {
  try {
    const response = await AxiosClient.get('/users');
    console.log('GetAll', response.data);
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};