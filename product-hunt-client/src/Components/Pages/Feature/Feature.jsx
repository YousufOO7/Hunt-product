import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import FeatureCard from "./FeatureCard";


const Feature = () => {
    const axiosPublic = useAxiosPublic();

    const {data: featuredProduct = [], refetch} = useQuery({
        queryKey: ['featured-product'],
        queryFn: async() => {
            const res = await axiosPublic.get('/featured-product')
            return res.data
        }
    }) 

    // sort product by time
    const sortFeaturedProduct = [...featuredProduct].sort((a, b) => {
        
    })

    return (
        <div className="my-10 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-center my-5">Featured Section: {featuredProduct?.length}</h2>

            <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        featuredProduct?.map(featureProduct => <FeatureCard key={featureProduct._id} featureProduct={featureProduct} refetch={refetch}></FeatureCard>)
                    }
            </section>

        </div>
    );
};

export default Feature;