import { Modal, Spin } from "antd";
import { FaPlus } from "react-icons/fa6";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import ShopForm from "../../components/form/ShopForm";
import { useState } from "react";
import { useGetMyShopQuery } from "../../redux/features/shop/shopApi";

const MyShop = () => {
  const [shopModalOpen, setShopModalOpen] = useState(false);

  // my shop
  const {
    data: myshop,
    isLoading,
    isError,
    error,
  } = useGetMyShopQuery(undefined);

  return (
    <>
      <div className="container mx-auto">
        {isLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}

        <div className="shop flex items-center gap-5 px-3 py-2">
          <img
            className="h-16 object-contain"
            src={myshop?.data?.logo || "/store.png"}
            alt="store"
          />
          <div>
            <h4 className="font-medium text-sm">{myshop?.data?.name}</h4>
            <p>{myshop?.data?.description}</p>
            <span className="px-2 py-1 text-[12px] rounded-sm border-violet-600 border text-violet5-400">
              {myshop?.data?.followedShop?.length || 0} following
            </span>
          </div>
        </div>
      </div>
      <div className="manage_products container mx-auto px-3 py-8">
        <div className="flex gap-2 items-center">
          {myshop?.data ? (
            <button
              onClick={() => setShopModalOpen(true)}
              className="bg-accent py-3 px-4 mb-5 rounded-lg flex gap-2 items-center text-white"
            >
              <FaPlus /> <span>Update Shop</span>
            </button>
          ) : (
            <button
              onClick={() => setShopModalOpen(true)}
              className="bg-accent py-3 px-4 mb-5 rounded-lg flex gap-2 items-center text-white"
            >
              <FaPlus /> <span>Add Shop</span>
            </button>
          )}
        </div>

        {/* shop modal */}
        <Modal
          title="Title"
          open={shopModalOpen}
          footer={null}
          onCancel={() => setShopModalOpen(false)}
        >
          <ShopForm setShopModalOpen={setShopModalOpen} />
        </Modal>

        {/* products table */}
      </div>
    </>
  );
};

export default MyShop;
