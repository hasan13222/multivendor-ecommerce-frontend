import { Spin } from "antd";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import {
  useChangeStatusMutation,
  useDeleteAccountMutation,
  useGetAllUserQuery,
} from "../../redux/features/auth/authApi";
import { toast } from "sonner";

const ManageUsers = () => {
  const { data, isLoading, isFetching, isError, error } =
    useGetAllUserQuery(undefined);

  const [changeAccStatus, { isLoading: ischangeStLoading }] =
    useChangeStatusMutation(undefined);

  const [deleteAcc, {isLoading: isDeleteAccLoading}] = useDeleteAccountMutation(undefined)

  type TStatusPyaload = {
    id: string;
    data: { status: string };
  };
  async function accountSuspendHandler(id: string, status: string) {
    const payload: TStatusPyaload = { id, data: { status: "" } };
    if (status === "Active") {
      payload.data.status = "Blocked";
    } else {
      payload.data.status = "Active";
    }
    const changedStatus = await changeAccStatus(payload);
    if(changedStatus.data){
      toast("user status changed successfully")
    } else{
      toast("something went wrong")
    }
  }
  async function accountDeleteHandler(id:string) {
    const deletedAcc = await deleteAcc(id);
    if(deletedAcc.data){
      toast("user deleted successfully");
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
        {ischangeStLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isDeleteAccLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="container mx-auto">
        <h2 className="font-bold text-3xl my-5">Manage Users</h2>
        <table className="overflow-auto border">
          <thead className="">
            <tr>
              <th className="bg-primary text-white px-3 py-2">User Name</th>
              <th className="bg-primary text-white px-3 py-2">User Email</th>
              <th className="bg-primary text-white px-3 py-2">Role</th>
              <th className="bg-primary text-white px-3 py-2">Status</th>
              <th className="bg-primary text-white px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((item: any) => (
              <tr key={item.id}>
                <td className="text-center p-3">{item.name}</td>
                <td className="text-center p-3">{item.email}</td>
                <td className="text-center p-3">{item.role}</td>
                <td className="text-center p-3">{item.status}</td>
                <td className="text-center flex p-3">
                  <button
                    onClick={() => accountSuspendHandler(item.id, item.status)}
                    className="bg-secondary text-white px-2 py-1"
                  >
                    {item.status === "Active" ? "Suspend" : "Unblock"}
                  </button>
                  /{" "}
                  <button onClick={() => accountDeleteHandler(item.id)} className="bg-red-600 text-white px-2 py-1">
                    Delete
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

export default ManageUsers;
