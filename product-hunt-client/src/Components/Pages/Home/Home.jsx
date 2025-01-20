import React from 'react';
import Banner from '../Banner/Banner';
import Feature from '../Feature/Feature';
import TrendingProduct from '../TrendingProduct/TrendingProduct';
import CouponSection from '../CouponSection/CouponSection';

const Home = () => {
    return (
        <div>
           <Banner></Banner>
           <Feature></Feature>
           <TrendingProduct></TrendingProduct>
           <CouponSection></CouponSection>
        </div>
    );
};

export default Home;