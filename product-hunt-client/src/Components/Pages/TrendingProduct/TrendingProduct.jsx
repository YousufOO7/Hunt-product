import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import AllProductsCard from "../Products/AllProductsCard";


const TrendingProduct = () => {
    const axiosPublic = useAxiosPublic();

    const { data: trendingProducts = [], refetch } = useQuery({
        queryKey: ['trending-products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/trending-products')
            return res.data
        }
    })

    return (
        <div className="my-10 max-w-6xl mx-auto">
            <h2 className="text-4xl lg:text-5xl mb-8 text-center font-bold">Trending Product</h2>

            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5 px-5 lg:px-0">
                {
                    trendingProducts.map(product => <AllProductsCard refetch={refetch} key={product._id} product={product}></AllProductsCard>)
                }
            </section>
        </div>
    );
};

export default TrendingProduct;