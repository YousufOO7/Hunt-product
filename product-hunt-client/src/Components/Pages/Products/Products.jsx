import AllProductsCard from "./AllProductsCard";
import useProducts from "../../../Hooks/useProducts";


const Products = () => {
    const [products] = useProducts();


    return (
        <div className="pt-20">
            <div className="max-w-6xl mx-auto my-10">
                <h2 className="text-4xl font-bold my-3 text-center">All Products</h2>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-5">
                    {
                        products.map(product => <AllProductsCard key={product._id} product={product}></AllProductsCard>)
                    }
                </section>
            </div>
        </div>
    );
};

export default Products;