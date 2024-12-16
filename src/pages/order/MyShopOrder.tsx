import { Spin, Table } from "antd";
import { columns } from "../../constants/manageProductTitle";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useGetMyShopOrderQuery } from "../../redux/features/order/orderApi";

const MyShopOrder = () => {
  // get all products
  const {
    data: products,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetMyShopOrderQuery({});
  const modifiedData = products?.data?.map((item:any) => {
    return {id: item.id, name: item.product.name, price: item.product.price, qty: item.product.qty, code: item.product.code}
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
      <div className="manage_products container mx-auto px-3 py-8">
      <h2 className="font-bold text-3xl mb-5">My Shop Order History</h2>
        {/* products table */}
        <div className="overflow-auto">
          <Table
            style={{ minWidth: "750px" }}
            columns={columns}
            dataSource={modifiedData}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default MyShopOrder;
