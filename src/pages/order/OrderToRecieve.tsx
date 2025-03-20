import { Spin, Table } from "antd";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useGetMyOrderQuery } from "../../redux/features/order/orderApi";
import { successOrderHistoryColumns } from "../../constants/successorderHistory";

const OrderToRecieve = () => {
  // get all products
  const {
    data: products,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetMyOrderQuery({});
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
      <div className="manage_products container mx-auto">
      <h2 className="font-semibold text-base my-3">My Order To Recieve</h2>
        {/* products table */}
        <div className="overflow-auto">
          <Table
            style={{ minWidth: "750px" }}
            columns={successOrderHistoryColumns}
            dataSource={modifiedData?.filter((item:any) => item.status === "Processing")}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default OrderToRecieve;
