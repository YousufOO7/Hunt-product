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