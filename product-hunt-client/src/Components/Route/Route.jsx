import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import Home from "../Pages/Home/Home";
import Login from "../../Social/Login";

 const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <h2>This is error page</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            }
        ]
    },
    {
        path: "login",
        element: <Login></Login>
    },
]); 

export default router;