import AxiosClient from '../../hooks/axios';

export const getAllSpecies = async () => {
  try {
    const response = await AxiosClient.get('/species');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};