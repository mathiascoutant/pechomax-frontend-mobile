import axios from "axios";

export const getSelf = async () => {
    try {
        const response = await axios.get('https://pechomax-backend.mrt-juillardfo.workers.dev/users/self'); 
        console.log(response.data);
        console.log('User registered');
      } catch (error) {      
        console.error(error);
      }
}; 