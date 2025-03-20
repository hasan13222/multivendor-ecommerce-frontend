import type { TableProps } from "antd";
import { TProductManage } from "../types/productType";

// manage product table
export const shopOrderStatusColumns: TableProps<TProductManage>["columns"] = [
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
  {
    title: "Product Name",
    dataIndex: "name",
    key: "name",
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
  
];
