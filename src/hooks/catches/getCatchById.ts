import AxiosClient from '../../hooks/axios';

export const getCatchById = async (id: string) => {
  try {
    const response = await AxiosClient.get(`/catches/${id}`);    
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};