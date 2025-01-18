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
import AddProduct from "../Dashboard/AddProduct/AddProduct";
import MyAddedProduct from "../Dashboard/MyAddedProduct/MyAddedProduct";
import UpdateProduct from "../Dashboard/MyAddedProduct/UpdateProduct";
import ModeratorProductReview from "../Dashboard/ModeratorProductReview/ModeratorProductReview";
import ProductDetailsByModerator from "../Dashboard/ModeratorProductReview/ProductDetailsByModerator";
import ModeratorRoute from "./ModeratorRoute";
import PrivateRoute from "./PrivateRoute";
import ReportedProduct from "../Dashboard/ReportedProduct/ReportedProduct";
import ReportProductDetails from "../Dashboard/ReportedProduct/ReportProductDetails";
import FeatureDetail from "../Pages/Feature/FeatureDetail";

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
                path: "/feature-detail/:id",
                element: <FeatureDetail></FeatureDetail>,
                loader: ({params}) => fetch(`http://localhost:5000/feature-detail/${params.id}`)
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
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            // moderator dashboard
            {
                path: 'product-review',
                element: <ModeratorRoute><ModeratorProductReview></ModeratorProductReview></ModeratorRoute>
            },
            {
                path: 'product/:id',
                element: <ModeratorRoute><ProductDetailsByModerator></ProductDetailsByModerator></ModeratorRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/products/${params.id}`)
            },
            {
                path: 'reported-product',
                element: <ModeratorRoute><ReportedProduct></ReportedProduct></ModeratorRoute>
            },
            {
                path: 'product-report/:id',
                element: <ModeratorRoute><ReportProductDetails></ReportProductDetails></ModeratorRoute>,
                loader: ({params}) => fetch(`http://localhost:5000/product-reported/${params.id}`)
            },
            // user dashboard
            {
                path: 'my-profile',
                element: <MyProfile></MyProfile>
            },
            {
                path: 'add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path: 'my-product',
                element: <MyAddedProduct></MyAddedProduct>
            },
            {
                path: 'updateProduct/:id',
                element: <UpdateProduct></UpdateProduct>,
                loader: ({params}) => fetch(`http://localhost:5000/updateProduct/${params.id}`)
            },
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