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
import ManageCoupons from "../pages/admin/ManageCoupons";
import AboutUs from "../pages/about/AboutUs";
import Contact from "../pages/contact/Contact";
import Shops from "../pages/shop/Shops";
import ProtectedPage from "../pages/ProtectedPage";
import Dashboard from "../pages/dashboard/Dashboard";
import DashboardLayout from "../components/layout/DashboardLayout";
import MyTransaction from "../pages/transaction/MyTransaction";
import MyShop from "../pages/vendor/MyShop";

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
        path: "dashboard",
        element: (
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        ),
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "shops",
        element: <Shops />,
      },
      {
        path: "about",
        element: <AboutUs />,
      },
      {
        path: "contact",
        element: <Contact />,
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
        element: (
          <AdminProtected>
            <DashboardLayout>
              <ManageCategories />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "manage-coupon",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <ManageCoupons />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "manage-shops",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <ManageShops />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "manage-users",
        element: (
          <AdminProtected>
            <DashboardLayout>
              <ManageUsers />
            </DashboardLayout>
          </AdminProtected>
        ),
      },
      {
        path: "manage-shop",
        element: (
          <VendorProtected>
            <DashboardLayout>
              <ManageShop />
            </DashboardLayout>
          </VendorProtected>
        ),
      },
      {
        path: "my-shop",
        element: (
          <VendorProtected>
            <DashboardLayout>
              <MyShop />
            </DashboardLayout>
          </VendorProtected>
        ),
      },
      {
        path: "my-order",
        element: (
          <ProtectedPage>
            <DashboardLayout>
              <MyOrder />
            </DashboardLayout>
          </ProtectedPage>
        ),
      },
      {
        path: "my-transaction",
        element: (
          <ProtectedPage>
            <DashboardLayout>
              <MyTransaction />
            </DashboardLayout>
          </ProtectedPage>
        ),
      },
      {
        path: "my-shop-order",
        element: (
          <DashboardLayout>
            <MyShopOrder />
          </DashboardLayout>
        ),
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
        element: (
          <ProtectedPage>
            <Checkout />
          </ProtectedPage>
        ),
      },
    ],
  },
]);

export default router;
