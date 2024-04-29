import AxiosClient from '../../hooks/axios';

export const getSelf = async () => {
  try {
    const response = await AxiosClient.get('/users/self');
    console.log('Getself', response.data);
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};


