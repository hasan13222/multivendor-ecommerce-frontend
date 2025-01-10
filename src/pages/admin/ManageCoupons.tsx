import { Button, ConfigProvider, Modal, Space, Spin } from "antd";
import { FaPlus } from "react-icons/fa6";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteCouponMutation, useGetAllCouponQuery } from "../../redux/features/coupon/couponApi";
import CouponForm from "../../components/form/CouponForm";

const ManageCoupons = () => {
  const [couponFormMode, setCouponFormMode] = useState("add");
  const [couponModalOpen, setCouponModalOpen] = useState(false);
  const [couponName, setCouponName] = useState("");
  const [couponId, setCouponId] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [couponDiscount, setCouponDiscount] = useState(0)

  // add product state update before query
  const showModal = () => {
    setCouponModalOpen(true);
    setCouponFormMode("add");
  };

  // close product form modal
  const handleCancel = () => {
    setCouponModalOpen(false);
  };

  // get all products
  const {
    data: couponegories,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetAllCouponQuery({});

  const [deleteCouponegory] = useDeleteCouponMutation(undefined)

  async function updateCouponHandler(id: string, name: string, code: string, discount:number){
    setCouponName(name)
    setCouponCode(code)
    setCouponDiscount(discount)
    setCouponId(id)
    setCouponFormMode("update");
    setCouponModalOpen(true);
    
  }
  async function deleteCouponegoryHandler(id:string){
    const deletedCoupon= await deleteCouponegory(id);
    if (deletedCoupon.data){
        toast("Coupon deleted successfully")
    }
  }

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
        {/* add product button */}
        <ConfigProvider
          theme={{
            token: {
              // Seed Token
              colorPrimary: "#00b96b",
              borderRadius: 6,
              // Alias Token
              colorBgContainer: "#f6ffed",
            },
          }}
        >
          <Space>
            <Button onClick={showModal} className="py-5 mb-5" type="primary">
              {" "}
              <FaPlus /> Add Coupons <span>&nbsp;</span>
            </Button>
          </Space>
        </ConfigProvider>

        {/* modal */}
        <Modal
          title={couponFormMode+" coupon"}
          open={couponModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <CouponForm formMode={couponFormMode} couponName={couponName} couponCode={couponCode} couponDiscount={couponDiscount} setCouponModalOpen={setCouponModalOpen} couponId={couponId} />
        </Modal>

        {/* products table */}
        <div className="container mx-auto">
          <h2 className="font-bold text-3xl my-5">All Coupons</h2>
          <table className="overflow-auto border">
            <thead className="">
              <tr>
                <th className="bg-primary text-white px-3 py-2">CouponName</th>
                <th className="bg-primary text-white px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {couponegories?.data?.map((item: any) => (
                <tr key={item.id}>
                  <td className="text-center p-3">{item.name}</td>
                  <td className="text-center flex p-3">
                    <button
                      onClick={() => updateCouponHandler(item.id, item.name, item.code, item.discount)}
                      className="bg-secondary text-white px-2 py-1"
                    >
                      Update
                    </button>
                    /{" "}
                    <button
                      onClick={() => deleteCouponegoryHandler(item.id)}
                      className="bg-red-600 text-white px-2 py-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ManageCoupons;
