import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar';
import Footer from '../Shared/Footer/Footer';

const MainLayOut = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='min-h-[calc(100vh-220px)]'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default MainLayOut;