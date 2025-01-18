// import { useEffect, useState } from 'react';
// import useAxiosPublic from './useAxiosPublic';

// const useProducts = (search) => {
//     const [products, setProducts] = useState([]);
//     const axiosPublic = useAxiosPublic();

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const { data } = await axiosPublic.get('/products', { params: { search } });
//                 setProducts(data);
//             } catch (error) {
//                 console.error('Error fetching products:', error);
//             }
//         };

//         fetchProducts();
//     }, [search, axiosPublic]);

//     return [products];
// };

// export default useProducts;

import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useProducts = (search) => {
    const axiosPublic = useAxiosPublic();

    const { data: products = [], refetch } = useQuery({
        queryKey: ['products', search], 
        queryFn:  async () => {
            const { data } = await axiosPublic.get(`/products?page=${currentPage}&size=${itemPerPage}`, { params: { search } });
            return data;
        }
    }
       
);
return [ products, refetch ];

};

export default useProducts;

