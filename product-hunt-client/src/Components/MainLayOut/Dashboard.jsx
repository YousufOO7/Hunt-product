import { NavLink, Outlet } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { MdPreview } from "react-icons/md";
import { FaBook, FaEdit, FaHome, FaList, FaProductHunt, FaUsers } from "react-icons/fa";
import { RiCoupon2Fill } from "react-icons/ri";
import useModerator from "../../Hooks/useModerator";
import useAdmin from "../../Hooks/useAdmin";

const Dashboard = () => {
    const [isModerator] = useModerator();
    const [isAdmin] = useAdmin();
    return (
        <div className="flex bg-pink-50">
            <div className="md:w-72 min-h-screen bg-green-200">
                <ul className="menu py-5">

                    {
                        isAdmin ? <>

                            <li>
                                <NavLink to="/dashboard/statistic">
                                    <MdPreview></MdPreview>
                                    Statistics
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageUsers">
                                    <FaUsers></FaUsers>
                                    Manage Users
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/dashboard/manageCoupon">
                                    <RiCoupon2Fill></RiCoupon2Fill>
                                    Manage Coupon
                                </NavLink>
                            </li>
                        </>
                            :
                            isModerator ? <>

                                <li>
                                    <NavLink to="/dashboard/product-review">
                                        <FaEdit></FaEdit>
                                        Product Review Queue
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to="/dashboard/reported-product">
                                        <FaBook></FaBook>
                                        Reported Contents
                                    </NavLink>
                                </li>
                            </>
                                // user route
                                :
                                <>
                                    <li>
                                        <NavLink to="/dashboard/my-profile">
                                            <ImProfile></ImProfile>
                                            My Profile
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/add-product">
                                            <FaList></FaList>
                                            Add Product
                                        </NavLink>
                                    </li>
                                    <li>
                                        <NavLink to="/dashboard/my-product">
                                            <FaProductHunt></FaProductHunt>
                                            My Product
                                        </NavLink>
                                    </li>
                                </>
                    }
                </ul>
                <div className="divider"></div>
                <ul className="menu">
                    <li>
                        <NavLink to="/">
                            <FaHome></FaHome>
                            Home
                        </NavLink>
                    </li>
                </ul>
            </div>

            {/* dashboard main */}
            <div className="w-full flex-1 max-w-4xl mx-auto">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;