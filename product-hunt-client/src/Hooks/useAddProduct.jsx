import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";


const useAddProduct = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();

    const {data: addedProduct = [], refetch} = useQuery({
        queryKey: ['add-product', user?.email],
        queryFn: async() => {
            const res = await axiosPublic.get(`/add-product?email=${user.email}`);
            return res.data
        }
    })
    return [addedProduct, refetch]
};

export default useAddProduct;