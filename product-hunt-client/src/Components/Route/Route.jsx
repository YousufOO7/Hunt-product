import {
    createBrowserRouter,
} from "react-router-dom";
import MainLayOut from "../MainLayOut/MainLayOut";
import Home from "../Pages/Home/Home";
import Login from "../../Social/Login";
import Register from "../../Social/Register";
import Products from "../Pages/Products/Products";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";
import ReviewForm from "../Pages/ReviewForm/ReviewForm";
import Dashboard from "../MainLayOut/Dashboard";
import MyProfile from "../Dashboard/MyProfile/MyProfile";

 const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <h2>This is error page</h2>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/products",
                element: <Products></Products>
            },
            {
                path: "/product/:id",
                element: <ProductDetails></ProductDetails>,
                loader: ({params}) => fetch(`http://localhost:5000/product/${params.id}`)
            },
            {
                path: "/review/:id",
                element: <ReviewForm></ReviewForm>,
                loader: ({params}) => fetch(`http://localhost:5000/review/${params.id}`)
            },
        ],
        
        
    },

    // dashboard
    {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
        children: [
            // user
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            }
        ]
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/register",
        element: <Register></Register>
    },
]); 

export default router;