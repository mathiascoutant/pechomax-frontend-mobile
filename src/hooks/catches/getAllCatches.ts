import AxiosClient from '../../hooks/axios';

export const getAllCatches = async () => {
  try {
    const response = await AxiosClient.get('/catches');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};


