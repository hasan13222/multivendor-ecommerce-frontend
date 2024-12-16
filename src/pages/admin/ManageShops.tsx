import { Spin } from "antd";
import { content } from "../../components/ui/Loading";
import {
  useChangeShopStatusMutation,
  useGetAllShopQuery,
} from "../../redux/features/shop/shopApi";
import { CustomError } from "../../types/baseQueryApi";
import { toast } from "sonner";

const ManageShops = () => {
  const { data, isLoading, isFetching, isError, error } =
    useGetAllShopQuery(undefined);

  const [updateShop, { isLoading: isupdateshopLoading }] =
  useChangeShopStatusMutation(undefined);

  type TStatusPyaloadData = {
    shopId: string;
    status: string;
  };
  async function accountSuspendHandler(shopId: string, status: string) {
    const payloadData: TStatusPyaloadData = { shopId, status: "" };
    if (status === "White") {
      payloadData.status = "Black";
    } else {
      payloadData.status = "white";
    }
    const changedStatus = await updateShop(payloadData);
    if (changedStatus.data) {
      toast("shop status changed successfully");
    } else {
      toast("something went wrong");
    }
  }
  return (
    <div>
      <div className="container mx-auto">
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isupdateshopLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="container mx-auto">
        <h2 className="font-bold text-3xl my-5">Manage Shops</h2>
        <table className="overflow-auto border">
          <thead className="">
            <tr>
              <th className="bg-primary text-white px-3 py-2">Logo</th>
              <th className="bg-primary text-white px-3 py-2">Name</th>
              <th className="bg-primary text-white px-3 py-2">Status</th>
              <th className="bg-primary text-white px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => (
              <tr key={item.id}>
                <td className="text-center p-3">{item.logo}</td>
                <td className="text-center p-3">{item.name}</td>
                <td className="text-center p-3">{item.status}</td>
                <td className="text-center flex p-3">
                  <button
                    onClick={() => accountSuspendHandler(item.id, item.status)}
                    className="bg-secondary text-white px-2 py-1"
                  >
                    {item.status === "White" ? "Blacklist" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageShops;
