import type { TableProps } from "antd";
import { TProductManage } from "../types/productType";
import Review from "../components/ui/Review";

// manage product table
export const successOrderHistoryColumns: TableProps<TProductManage>["columns"] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Qty",
    dataIndex: "qty",
    key: "qty",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return <Review orderItem={record}/>;
    },
  },
];
