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
import FeatureReviewForm from "../Pages/Feature/FeatureReviewForm";
import AllUsers from "../Dashboard/AllUsers/AllUsers";
import ManageCoupon from "../Dashboard/ManageCoupon/ManageCoupon";
import AddCouponForm from "../Dashboard/ManageCoupon/AddCouponForm";
import UpdateCoupon from "../Dashboard/ManageCoupon/UpdateCoupon";
import AdminRoute from "./AdminRoute";
import Payment from "../Dashboard/Payment/Payment";
import Statistics from "../Dashboard/Statistics/Statistics";

 const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayOut></MainLayOut>,
        errorElement: <div className=' justify-center mt-52'>
        <p className="text-4xl font-bold flex justify-center mt-52">Oooppppss Error: 404 page is not Found</p>
        </div>,
        children: [
            {
                path: "/",
                element: <Home></Home>
            },
            {
                path: "/products",
                element: <Products></Products>,
                loader: () => fetch('https://product-hunt-server-theta.vercel.app/product-count')
            },
            {
                path: "/product/:id",
                element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/product/${params.id}`)
            },
            {
                path: "/feature-detail/:id",
                element: <FeatureDetail></FeatureDetail>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/feature-detail/${params.id}`)
            },
            {
                path: "/review/:id",
                element: <ReviewForm></ReviewForm>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/review/${params.id}`)
            },
            {
                path: "/feature/review/:id",
                element: <FeatureReviewForm></FeatureReviewForm>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/feature/review/${params.id}`)
            },
        ],
        
        
    },

    // dashboard
    {
        path: "/dashboard",
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <div className=' justify-center mt-52'>
        <p className="text-4xl font-bold flex justify-center mt-52">Oooppppss Error: 404 page is not Found</p>
        </div>,
        children: [

            // admin dashboard
            {
                path: 'statistic',
                element: <AdminRoute><Statistics></Statistics></AdminRoute>
            },
            {
                path: 'manageUsers',
                element: <AdminRoute><AllUsers></AllUsers></AdminRoute>,
            },
            {
                path: 'manageCoupon',
                element: <AdminRoute><ManageCoupon></ManageCoupon></AdminRoute>,
            },
            {
                path: 'add-coupon',
                element: <AdminRoute><AddCouponForm></AddCouponForm></AdminRoute>,
            },
            {
                path: 'updateCoupon/:id',
                element: <UpdateCoupon></UpdateCoupon>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/updateCoupon/${params.id}`)
            },

            // moderator dashboard
            {
                path: 'product-review',
                element: <ModeratorRoute><ModeratorProductReview></ModeratorProductReview></ModeratorRoute>
            },
            {
                path: 'product/:id',
                element: <ModeratorRoute><ProductDetailsByModerator></ProductDetailsByModerator></ModeratorRoute>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/products/${params.id}`)
            },
            {
                path: 'reported-product',
                element: <ModeratorRoute><ReportedProduct></ReportedProduct></ModeratorRoute>
            },
            {
                path: 'product-report/:id',
                element: <ModeratorRoute><ReportProductDetails></ReportProductDetails></ModeratorRoute>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/product-reported/${params.id}`)
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
                path: 'payment',
                element: <Payment></Payment>
            },
            {
                path: 'updateProduct/:id',
                element: <UpdateProduct></UpdateProduct>,
                loader: ({params}) => fetch(`https://product-hunt-server-theta.vercel.app/updateProduct/${params.id}`)
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