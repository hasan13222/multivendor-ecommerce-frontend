import { Spin, Table } from "antd";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useGetMyShopOrderQuery } from "../../redux/features/order/orderApi";
import { shopOrderHistoryColumns } from "../../constants/shopOrderHistory";

const OrderToDeliver = () => {
  // get all products
  const {
    data: products,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetMyShopOrderQuery({});
  const modifiedData = products?.data?.map((item:any) => {
    return {id: item.id, name: item.product.name, status: item.status, price: item.product.price, qty: item.qty, code: item.product.code, date: item.createdAt, productId: item.product.id}
  })

  return (
    <>
      <div className="container mx-auto">
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="manage_products container mx-auto px-3">
      <h2 className="font-bold text-3xl mb-5">Order To Deliver</h2>
        {/* products table */}
        <div className="overflow-auto">
          <Table
            style={{ minWidth: "750px" }}
            columns={shopOrderHistoryColumns}
            dataSource={modifiedData?.filter((item:any) => item.status === "Processing")}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default OrderToDeliver;
