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
    isLoading,
  } = useGetShopProductsQuery({ shopId: myshop?.data?.id });

  return (
    <>
      <div className="container mx-auto">
        {isLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}

        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="manage_products container mx-auto px-3">
        <div className="flex gap-2 items-center mb-5">
          
      <h2 className="font-bold text-2xl">My Shop Products</h2>
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
              <Button onClick={showModal} className="py-5 " type="primary">
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
          <ProductForm shopId={myshop?.data?.id} />
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
