import { useGetAllShopQuery, useGetMyShopQuery } from "../../redux/features/shop/shopApi";
import { useGetShopProductsQuery } from "../../redux/features/product/productApi";
import {
  useGetMyOrderQuery,
  useGetMyShopOrderQuery,
} from "../../redux/features/order/orderApi";
import { Card } from "antd";
import { CustomJwtPayload } from "../../../types";
import { jwtDecode } from "jwt-decode";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useGetAllCouponQuery } from "../../redux/features/coupon/couponApi";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";

const Dashboard = () => {
  // my shop
  const { data: myshop } = useGetMyShopQuery(undefined);

  // get all products
  const { data: products } = useGetShopProductsQuery({
    shopId: myshop?.data?.id,
  });

  // get all products
  const { data: orderedproducts } = useGetMyShopOrderQuery({});

  let decoded: any;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwtDecode(token) as CustomJwtPayload;
  }

  const { data: customerProducts } = useGetMyOrderQuery({});

  const { data: categories } = useGetCategoriesQuery({});

  const { data: coupons } = useGetAllCouponQuery({});

  const { data: shops} = useGetAllShopQuery(undefined);

  const { data: users } = useGetAllUserQuery(undefined);
  return (
    <>
      <h2 className="font-bold text-3xl mb-2">Dashboard</h2>
      {decoded?.role === "Vendor" && (
        <Card title="Dashboard">
          <Card
            type="inner"
            title="Shop Active Product"
            extra={<a href="manage-shop">Add More</a>}
          >
            <p className="text-xl font-semibold">{products?.data?.length}</p>
          </Card>
          <Card
            style={{ marginTop: 16 }}
            type="inner"
            title="Total Order Placed"
            extra={<a href="my-shop-order">Explore</a>}
          >
            <p className="text-xl font-semibold">
              {orderedproducts?.data?.length}
            </p>
          </Card>
        </Card>
      )}
      {decoded?.role === "Customer" && (
        <Card title="Dashboard">
          <Card
            type="inner"
            title="My Total Order"
            extra={<a href="my-order">Details</a>}
          >
            <p className="text-xl font-semibold">
              {customerProducts?.data?.length}
            </p>
          </Card>
        </Card>
      )}
      {decoded?.role === "Admin" && (
        <Card title="Dashboard">
          <Card
            type="inner"
            title="Total Categories"
            extra={<a href="manage-category">Manage</a>}
          >
            <p className="text-xl font-semibold">{categories?.data?.length}</p>
          </Card>
          <Card
            type="inner"
            title="Total Coupons"
            extra={<a href="manage-coupon">Manage</a>}
          >
            <p className="text-xl font-semibold">{coupons?.data?.length}</p>
          </Card>
          <Card
            type="inner"
            title="Total Users"
            extra={<a href="manage-users">Manage</a>}
          >
            <p className="text-xl font-semibold">{users?.data?.length}</p>
          </Card>
          <Card
            type="inner"
            title="Total Shops"
            extra={<a href="manage-shops">Manage</a>}
          >
            <p className="text-xl font-semibold">{shops?.data?.length}</p>
          </Card>
        </Card>
      )}
    </>
  );
};

export default Dashboard;
