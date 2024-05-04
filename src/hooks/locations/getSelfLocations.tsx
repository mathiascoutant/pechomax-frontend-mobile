import AxiosClient from '../../hooks/axios';

export const getSelfLocations = async () => {
  try {
    const response = await AxiosClient.get('/locations/self');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};