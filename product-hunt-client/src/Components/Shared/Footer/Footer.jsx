import React from 'react';
import footerLogo from '../../../../public/images/navLogo2.png'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div>
            <footer className="footer bg-green-400 text-base-content p-10">
                <nav>
                <h6 className="footer-title">Trend Tracker</h6>
                    <img src={footerLogo} className='w-24 h-24' alt="" />
                    <div className='flex gap-2'>
                        <a href="#"><FaFacebook className='text-blue-800 text-2xl'></FaFacebook></a>
                        <a href=""><FaInstagram className='text-orange-600 text-2xl'></FaInstagram></a>
                        <a href=""><FaLinkedin className='text-blue-600 text-2xl'></FaLinkedin></a>
                    </div>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
                <form>
                    <h6 className="footer-title">Newsletter</h6>
                    <fieldset className="form-control w-80">
                        <label className="label">
                            <span className="label-text">Enter your email address</span>
                        </label>
                        <div className="join">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered join-item" />
                            <button className="btn btn-primary join-item">Subscribe</button>
                        </div>
                    </fieldset>
                </form>
            </footer>
            <footer className="footer footer-center bg-green-400 text-base-content p-4">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Trend Tracker Ltd</p>
                </aside>
            </footer>
        </div>

    );
};

export default Footer;