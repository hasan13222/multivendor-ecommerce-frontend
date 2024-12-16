import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import SingleProduct from "../pages/products/SingleProduct";
import Cart from "../pages/cart/Cart";
import Checkout from "../pages/checkout/Checkout";
import ShopProducts from "../pages/products/ShopProducts";
import Login from "../pages/login/Login";
import MyOrder from "../pages/order/MyOrder";
import MyShopOrder from "../pages/order/MyShopOrder";
import Register from "../pages/register/Register";
import ChangePassword from "../pages/login/ChangePassword";
import ForgetPassword from "../pages/login/ForgetPassword";
import ManageShop from "../pages/vendor/ManageShop";
import AdminProtected from "../pages/AdminProtected";
import VendorProtected from "../pages/VendorProtected";
import ManageShops from "../pages/admin/ManageShops";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageCategories from "../pages/admin/ManageCategories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/shop/:shopId",
        element: <ShopProducts />,
      },
      {
        path: "products/:productId",
        element: <SingleProduct />,
      },
      {
        path: "manage-category",
        element: <AdminProtected><ManageCategories /></AdminProtected>,
      },
      {
        path: "manage-shops",
        element: <AdminProtected><ManageShops /></AdminProtected>,
      },
      {
        path: "manage-users",
        element: <AdminProtected><ManageUsers /></AdminProtected>,
      },
      {
        path: "manage-shop",
        element: <VendorProtected><ManageShop /></VendorProtected>,
      },
      {
        path: "my-order",
        element: <MyOrder />,
      },
      {
        path: "my-shop-order",
        element: <MyShopOrder />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "change-password",
        element: <ChangePassword />,
      },
      {
        path: "forget-password",
        element: <ForgetPassword />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
    ],
  },
]);

export default router;
