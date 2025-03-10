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
import { useGetAllShopQuery } from "../../redux/features/shop/shopApi";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "antd";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useGetAllCouponQuery } from "../../redux/features/coupon/couponApi";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
const AdminDashboard = () => {
  const [customerChartData, setCustomerChartData] = useState<
    Record<string, any>[]
  >([]);

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

      <Card className="px-5 mt-2">
      <h3 className="text-xl font-semibold mb-5">Shopwise Products</h3>
        <table className="overflow-auto border w-full">
          <thead className="">
            <tr>
              <th className="bg-[#82ca9d] text-white px-3 py-2">Name</th>
              <th className="bg-[#82ca9d] text-white px-3 py-2">No. Of Products</th>
            </tr>
          </thead>
          <tbody>
            {shops?.data?.map((item: any) => (
              <tr className="border-b" key={item.id}>
                <td className="text-center p-3">{item.name}</td>
                <td className="text-center p-3">{item?._count?.Product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <Card className="h-[500px] px-5 mt-2">
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
  );
};

export default AdminDashboard;
