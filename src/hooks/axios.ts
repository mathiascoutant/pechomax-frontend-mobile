import axios, { AxiosInstance } from 'axios';

const AxiosClient = (): AxiosInstance => {
  const axiosClient = axios.create({
    withCredentials: true,
    baseURL: `${process.env.EXPO_PUBLIC_BASE_URL}/api`,
    headers: {
        'Content-Type': 'multipart/form-data',
      },
  });

  return axiosClient;
};

export default AxiosClient();