import { Button, ConfigProvider, Modal, Space, Spin, Table } from "antd";
import { FaPlus } from "react-icons/fa6";
import { columns } from "../../constants/manageProductTitle";
import { content } from "../../components/ui/Loading";
import ProductForm from "../../components/form/ProductForm";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setFormMode,
  setmodalOpen,
  setProductId,
  setProductPicture,
} from "../../redux/features/product/productSlice";
import { CustomError } from "../../types/baseQueryApi";
import { useGetShopProductsQuery } from "../../redux/features/product/productApi";
import ShopForm from "../../components/form/ShopForm";
import { useState } from "react";
import { useGetMyShopQuery } from "../../redux/features/shop/shopApi";
import { toast } from "sonner";

const ManageShop = () => {
  const [shopModalOpen, setShopModalOpen] = useState(false);
  const { modalOpen, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // my shop
  const { data: myshop } = useGetMyShopQuery(undefined);

  // add product state update before query
  const showModal = () => {
    if (!myshop.data) {
      toast("Please add shop first");
      return;
    }
    dispatch(setmodalOpen(true));
    dispatch(setFormMode("add"));
    dispatch(setProductId(""));
    dispatch(setProductPicture(""));
  };

  // close product form modal
  const handleCancel = () => {
    dispatch(setmodalOpen(false));
  };

  // get all products
  const {
    data: products,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetShopProductsQuery({shopId: myshop?.data?.id});

  return (
    <>
      <div className="container mx-auto">
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}

        <div className="shop flex items-center gap-5 px-3 py-2">
          <img className="h-16 object-contain" src={myshop?.data?.logo || "/store.png"} alt="store" />
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
                <FaPlus /> Add Product <span>&nbsp;</span>
              </Button>
            </Space>
          </ConfigProvider>
        </div>

        {/* modal */}
        <Modal
          title="Title"
          open={modalOpen}
          footer={null}
          confirmLoading={loading}
          onCancel={handleCancel}
        >
          <ProductForm shopId={myshop?.data?.id}/>
        </Modal>

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
        <div className="overflow-auto">
          <Table
            style={{ minWidth: "750px" }}
            columns={columns}
            dataSource={products?.data}
            rowKey={(record) => record.id}
          />
        </div>
      </div>
    </>
  );
};

export default ManageShop;
