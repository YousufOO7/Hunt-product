import React from 'react';
import { Link, NavLink } from 'react-router-dom';
// import navLogo from '../../../../public/images/navLogo.jpeg'
import navLogo from '../../../../public/images/navLogo2.png'
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, Logout } = useAuth();
    const Links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><a>Products</a></li>
    </>

    return (
        <div className="navbar bg-gray-300 lg:px-24 px-5">
            <div className="navbar-start">
                <div className='dropdown'>
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            Links
                        }
                    </ul>
                </div>
                <div className='flex items-center'>
                    <img src={navLogo} className='w-16 h-16' alt="" />
                    <a className="btn btn-ghost text-xl">TrendTracker</a>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        Links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <div className='flex gap-2'>
                    <Link to='login'><button className='btn'>Login</button></Link>
                    <button className='btn'>Register</button>
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                                user && user?.email ? <img
                                    alt="Tailwind CSS Navbar component"
                                    src={user.photoURL} referrerPolicy='no-referrer' /> :
                                    <img
                                        alt="Tailwind CSS Navbar component"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            }
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                            </a>
                        </li>
                        <li><a>Dashboard</a></li>
                        <li onClick={Logout} ><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;