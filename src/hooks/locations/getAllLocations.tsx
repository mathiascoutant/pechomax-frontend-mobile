import AxiosClient from '../../hooks/axios';

export const getAllLocations = async () => {
  try {
    const response = await AxiosClient.get('/locations');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};