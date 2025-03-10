import { Spin, Table } from "antd";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useGetMyTransactionQuery } from "../../redux/features/transaction/transactionApi";
import { transactionHistoryColumns } from "../../constants/transactionCols";

const MyTransaction = () => {
  // get all products
  const {
    data,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetMyTransactionQuery({});

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
      <h2 className="font-bold text-2xl mb-5">Transaction History</h2>
        {/* products table */}
        <div className="overflow-auto">
          <Table
            style={{ minWidth: "750px" }}
            columns={transactionHistoryColumns}
            dataSource={data?.data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default MyTransaction;
