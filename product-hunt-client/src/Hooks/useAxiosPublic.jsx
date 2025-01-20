import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://product-hunt-server-theta.vercel.app',
    withCredentials: true,
})

const useAxiosPublic = () => {
   return axiosInstance;
};

export default useAxiosPublic;