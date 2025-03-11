import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import { useGetAllShopQuery } from "../../redux/features/shop/shopApi";
import AutoSizer from "react-virtualized-auto-sizer";

import { Card } from "antd";
import { useGetAllUserQuery } from "../../redux/features/auth/authApi";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import { useGetAllCouponQuery } from "../../redux/features/coupon/couponApi";
import { useEffect, useMemo, useState } from "react";
import CountUp from "react-countup";
import { useGetAllTransactionQuery } from "../../redux/features/transaction/transactionApi";
const AdminDashboard = () => {
  const [customerChartData, setCustomerChartData] = useState<
    Record<string, any>[]
  >([]);

  const { data: categories } = useGetCategoriesQuery({});

  const { data: coupons } = useGetAllCouponQuery({});

  const { data: shops } = useGetAllShopQuery(undefined);

  const { data: users } = useGetAllUserQuery(undefined);

  const { data: transactions } = useGetAllTransactionQuery(undefined);

  const transactionsByMonth = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const trsByMonth: Record<string, number> = {};
    months.forEach((item:string) => trsByMonth[item] = 0);
    transactions?.data?.map((item: any) => {
      const month = months[new Date(item?.createdAt).getMonth()];
      trsByMonth[month] = trsByMonth[month] + item?.amount;
    });

    return Object.keys(trsByMonth).map((item: string) => {
      return { month: item, amount: trsByMonth[item] };
    });
  }, [transactions]);

  console.log(transactions, transactionsByMonth);

  useEffect(() => {
    const roleWiseData: Record<string, any> = {};
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
              <th className="bg-[#82ca9d] text-white px-3 py-2">
                No. Of Products
              </th>
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

      {/* monthwise transaction */}

      <Card className="h-[400px] px-5 mt-2">
        <h3 className="text-xl font-semibold mb-5">Monthwise Transactions</h3>
        <AutoSizer>
          {({ width }) => {
            return (
              <AreaChart
                width={width}
                height={300}
                data={transactionsByMonth}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#8884d8"
                  fill="#8884d8"
                />
              </AreaChart>
            );
          }}
        </AutoSizer>
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
