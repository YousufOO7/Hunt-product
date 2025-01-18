import React from 'react';
import Banner from '../Banner/Banner';
import Feature from '../Feature/Feature';
import TrendingProduct from '../TrendingProduct/TrendingProduct';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Feature></Feature>
           <TrendingProduct></TrendingProduct>
        </div>
    );
};

export default Home;