import type { TableProps } from "antd";
import { TProductManage } from "../types/productType";
import UpdateProduct from "../components/ui/UpdateProduct";

// manage product table
export const columns: TableProps<TProductManage>["columns"] = [
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
    title: "Stock",
    dataIndex: "stock",
    key: "stock",
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => {
      return <UpdateProduct id={record.id} />;
    },
  },
];
