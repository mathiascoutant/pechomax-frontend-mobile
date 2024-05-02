import AxiosClient from '../../hooks/axios';

export const getSelfCatches = async () => {
  try {
    const response = await AxiosClient.get('/catches/self');    
    console.log('GetSelfCatches', response);
    
    return response.data;
  } catch (error) {      
    // @ts-ignore
    console.error('erreueueueuer', error);
    return null;
  }
};