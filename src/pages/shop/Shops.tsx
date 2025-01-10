import { Spin } from "antd";
import { useGetAllShopQuery } from "../../redux/features/shop/shopApi";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import Shop from "../../components/ui/Shop";

const Shops = () => {
  const {
    data: allShops,
    isLoading,
    isFetching,
    isError,
    error,
  } = useGetAllShopQuery(undefined);
  return (
    <div className="products container mx-auto px-3 py-8">
      <h2 className="font-bold text-3xl mb-5">EcoHub Shops</h2>
      {isLoading && isFetching && (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      )}
      {isError && <p>{(error as CustomError)?.data?.message}</p>}
      <div className="flex flex-col gap-5">
        {allShops?.data?.map((itm: any) => (
          <Shop item={itm} />
        ))}
        
      </div>
    </div>
  );
};

export default Shops;
