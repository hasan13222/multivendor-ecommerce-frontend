import type { TableProps } from "antd";
import { TProductManage } from "../types/productType";

// manage product table
export const transactionHistoryColumns: TableProps<TProductManage>["columns"] = [
  {
    title: "Date",
    dataIndex: "createdAt",
    key: "date",
  },
  {
    title: "Transaction ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amt",
  },  
];
