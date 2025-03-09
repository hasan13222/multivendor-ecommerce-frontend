import {
  useGetAllShopQuery,
  useGetMyShopQuery,
} from "../../redux/features/shop/shopApi";
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
import CountUp from "react-countup";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

import AutoSizer from "react-virtualized-auto-sizer";

const Dashboard = () => {
  const [customerChartData, setCustomerChartData] = useState<
    Record<string, any>[]
  >([]);


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

  const { data: shops } = useGetAllShopQuery(undefined);

  const { data: users } = useGetAllUserQuery(undefined);

  useEffect(() => {
    const roleWiseData: Record<string, any> = {};
    console.log(users);
    users?.data?.forEach((item: any) => {
      const role = item.role;
      return roleWiseData[role]
        ? roleWiseData[role].push(item._id)
        : (roleWiseData[role] = [item._id]);
    });

    const customerChartArray = Object.keys(roleWiseData).map((key: string) => {
      return { type: key, Total: roleWiseData[key].length };
    });
    setCustomerChartData(customerChartArray);
  }, [users]);
  return (
    <>
      <h2 className="font-bold text-3xl mb-2">Dashboard</h2>
      {decoded?.role === "Vendor" && (
        <Card title="Summary">
          <div className="grid grid-cols-2 gap-4">
            <Card
              type="inner"
              title="Shop Active Product"
              extra={<a href="manage-shop">Add More</a>}
            >
              <p className="text-xl font-semibold">
                <CountUp end={products?.data?.length} />
              </p>
            </Card>
            <Card
              type="inner"
              title="Total Order Placed"
              extra={<a href="my-shop-order">Explore</a>}
            >
              <p className="text-xl font-semibold">
                <CountUp end={orderedproducts?.data?.length} />
              </p>
            </Card>
          </div>
        </Card>
      )}
      {decoded?.role === "Customer" && (
        <Card title="Summary">
          <div className="grid grid-cols-2 gap-4">
            <Card
              type="inner"
              title="My Total Order"
              extra={<a href="my-order">Details</a>}
            >
              <p className="text-xl font-semibold">
                <CountUp end={customerProducts?.data?.length} />
              </p>
            </Card>
          </div>
        </Card>
      )}
      {decoded?.role === "Admin" && (
        <>
          <Card title="Summary">
            <div className="grid grid-cols-2 gap-4">
              <Card
                type="inner"
                title="Total Categories"
                extra={<a href="manage-category">Manage</a>}
              >
                <p className="text-xl font-semibold">
                  <CountUp end={categories?.data?.length} />
                </p>
              </Card>
              <Card
                type="inner"
                title="Total Coupons"
                extra={<a href="manage-coupon">Manage</a>}
              >
                <p className="text-xl font-semibold">
                  <CountUp end={coupons?.data?.length} />
                </p>
              </Card>
              <Card
                type="inner"
                title="Total Users"
                extra={<a href="manage-users">Manage</a>}
              >
                <p className="text-xl font-semibold">
                  <CountUp end={users?.data?.length} />
                </p>
              </Card>
              <Card
                type="inner"
                title="Total Shops"
                extra={<a href="manage-shops">Manage</a>}
              >
                <p className="text-xl font-semibold">
                  <CountUp end={shops?.data?.length} />
                </p>
              </Card>
            </div>
          </Card>

          <Card className="h-[500px] p-5 mt-2">
            <h3 className="text-xl font-semibold mb-5">Site Users</h3>
            <AutoSizer>
              {({ width }) => {
                return (
                  <BarChart
                    width={width}
                    height={400}
                    data={customerChartData}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="Total"
                      fill="#82ca9d"
                      activeBar={<Rectangle fill="gold" stroke="purple" />}
                    />
                  </BarChart>
                );
              }}
            </AutoSizer>
          </Card>
        </>
      )}
    </>
  );
};

export default Dashboard;
