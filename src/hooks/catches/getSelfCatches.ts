import AxiosClient from '../../hooks/axios';

export const getSelfCatches = async () => {
  try {
    const response = await AxiosClient.get('/catches/self');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};