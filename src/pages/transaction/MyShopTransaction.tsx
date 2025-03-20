import { Spin, Table } from "antd";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useGetMyShopTransactionQuery } from "../../redux/features/transaction/transactionApi";
import { transactionHistoryColumns } from "../../constants/transactionCols";
import { useGetMyShopQuery } from "../../redux/features/shop/shopApi";

const MyShopTransaction = () => {
    
      const { data: myshop } = useGetMyShopQuery(undefined);
  // get all products
  const {
    data,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetMyShopTransactionQuery(myshop?.data?.id);

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
      <h2 className="font-bold text-2xl mb-5">My Shop Transaction History</h2>
        {/* products table */}
        <div className="overflow-auto">
          <Table
            style={{ minWidth: "750px" }}
            columns={transactionHistoryColumns}
            dataSource={data?.data}
            rowKey={(record) => record.id}
            pagination={{pageSize: 7}}
          />
        </div>
      </div>
    </>
  );
};

export default MyShopTransaction;
