import type { TableProps } from "antd";
import { TProductManage } from "../types/productType";
import Deliver from "../components/ui/Deliver";

// manage product table
export const shopOrderHistoryColumns: TableProps<TProductManage>["columns"] = [
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
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => <span className={text==="Cancelled" ? "text-red-500" : text === "Delivered" ? "text-green-500" : "text-accentColor"}>{text}</span>,
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return <Deliver orderItem={record}/>;
    },
  },
];
