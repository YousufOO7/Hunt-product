import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import navLogo from '../../../../public/images/navLogo2.png'
import useAuth from '../../../Hooks/useAuth';

const Navbar = () => {
    const { user, Logout } = useAuth();
    const Links = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/products">Products</NavLink></li>
    </>

    return (
        <div className="navbar fixed bg-green-300 z-10 lg:px-24 px-5">
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
                    {
                        user && user?.email ? '' : <Link to='login'><button className='btn'>Login</button></Link>
                    }
                </div>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {
                                user && user?.email ? <img
                                    alt="user"
                                    src={user.photoURL} referrerPolicy='no-referrer' /> :
                                    <img
                                        alt="user"
                                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            }
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {
                            user && user?.email ?
                                <li>
                                    <a
                                        className="justify-between pointer-events-none cursor-default"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        {user.displayName}
                                    </a>
                                </li>
                                : ''
                        }
                        <Link to="/dashboard/my-profile">
                            <li><a>Dashboard</a></li>
                        </Link>
                        <li onClick={Logout} ><a>Logout</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;