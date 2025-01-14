import { useEffect, useState } from 'react';
import useAxiosPublic from './useAxiosPublic';

const useProducts = (search) => {
    const [products, setProducts] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axiosPublic.get('/products', { params: { search } });
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, [search, axiosPublic]);

    return [products];
};

export default useProducts;
