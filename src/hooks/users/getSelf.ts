import axios from "axios";

export const getSelf = async () => {
  try {
    const response = await axios.get('https://pechomax-backend.mrt-juillardfo.workers.dev/users/self');
    console.log('Getself', response.data);
    return response.data;
  } catch (error) {      
    console.error(error);
    return null;
  }
};


