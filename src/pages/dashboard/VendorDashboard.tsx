import CountUp from "react-countup";
import { Card, Table } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useGetMyShopTransactionQuery } from "../../redux/features/transaction/transactionApi";
import { useMemo } from "react";
import { useGetMyShopQuery } from "../../redux/features/shop/shopApi";
import { useGetMyShopOrderQuery } from "../../redux/features/order/orderApi";
import AutoSizer from "react-virtualized-auto-sizer";
import { shopOrderStatusColumns } from "../../constants/shopOrderStatus";
const VendorDashboard = () => {
  // my shop
  const { data: myshop } = useGetMyShopQuery(undefined);
  // get my shop transactions
  const { data: transactions } = useGetMyShopTransactionQuery(myshop?.data?.id);

  //   my shop earning
  const totalEarning = useMemo(() => {
    const total = transactions?.data?.reduce(
      (acc: number, item: any) => acc + item.amount,
      0
    );
    return total;
  }, [transactions]);

  //   my shop order
  const { data: myshopOrders } = useGetMyShopOrderQuery(undefined);

  const modifiedData = useMemo(() => {
    return myshopOrders?.data?.map((item: any) => {
      return { id: item.id, name: item.product.name, status: item.status, price: item.product.price, qty: item.qty, code: item.product.code, date: item.createdAt, productId: item.product.id }
    })
  }, [myshopOrders])

  const revenuesByProductCode = useMemo(() => {
    const revenues: Record<string, number> = {};
    myshopOrders?.data?.map((item: any) => {
      if (revenues[item?.product?.code]) {
        revenues[item?.product?.code] =
          revenues[item?.product?.code] + item?.product?.price * item?.qty;
      } else {
        revenues[item?.product?.code] = item?.product?.price * item?.qty;
      }
    });

    return Object.keys(revenues).map((item: string) => {
      return { code: item, amount: revenues[item] };
    });
  }, [myshopOrders]);

  return (
    <>
      <Card title="Summary">
        <div className="grid grid-cols-2 gap-4">
          <Card
            type="inner"
            title="Total Earning"
            extra={<a href="my-shop-order">See More</a>}
          >
            <p className="text-xl font-semibold">
              $<CountUp end={totalEarning} />
            </p>
          </Card>
          <Card
            type="inner"
            title="Total Order Placed"
            extra={<a href="my-shop-order">Explore</a>}
          >
            <p className="text-xl font-semibold">
              <CountUp end={transactions?.data?.length} />
            </p>
          </Card>
        </div>
      </Card>

      <Card className="h-[500px] px-5 mt-2">
        <h3 className="text-xl font-semibold mb-5">Revenues by Product</h3>
        <AutoSizer>
          {({ width }) => {
            return (
              <AreaChart
                width={width}
                height={400}
                data={revenuesByProductCode}
                margin={{
                  top: 10,
                  right: 30,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="code" />
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

      <Card>
        <div className="manage_products container mx-auto px-3">
          <h2 className="font-bold text-3xl mb-5">Recent Delivered Order</h2>
          {/* products table */}
          <div className="overflow-auto">
            <Table
              style={{ minWidth: "750px" }}
              columns={shopOrderStatusColumns}
              pagination={false}
              dataSource={modifiedData?.filter((item: any) => item.status === "Delivered").slice(0,5)}
              rowKey={(record) => record.id}
            />
          </div>
        </div>
      </Card>
    </>
  );
};

export default VendorDashboard;
