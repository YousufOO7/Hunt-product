import { NavLink, Outlet } from "react-router-dom";
import { ImProfile } from "react-icons/im";
import { FaBook, FaEdit, FaHome, FaList, FaProductHunt } from "react-icons/fa";
import useModerator from "../../Hooks/useModerator";

const Dashboard = () => {
    const [isModerator] = useModerator();
    return (
        <div className="flex bg-pink-50">
            <div className="md:w-72 min-h-screen bg-green-200">
                <ul className="menu py-5">
                   
                               {
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