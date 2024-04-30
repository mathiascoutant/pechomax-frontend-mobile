import AxiosClient from '../../hooks/axios';

export const getCategories = async () => {
  try {
    const response = await AxiosClient.get('/categories');    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};


