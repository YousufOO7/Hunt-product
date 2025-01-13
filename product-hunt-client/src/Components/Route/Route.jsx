import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import Home from "../Pages/Home/Home";

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
]); 

export default router;