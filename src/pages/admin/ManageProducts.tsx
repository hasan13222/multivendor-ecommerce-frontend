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
import { useGetProductsQuery } from "../../redux/features/product/productApi";

const ManageProducts = () => {
  const { modalOpen, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  // add product state update before query
  const showModal = () => {
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
  } = useGetProductsQuery({});

  console.log(products)

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
              <FaPlus /> Add Product <span>&nbsp;</span>
            </Button>
          </Space>
        </ConfigProvider>

        {/* modal */}
        <Modal
          title="Title"
          open={modalOpen}
          footer={null}
          confirmLoading={loading}
          onCancel={handleCancel}
        >
          <ProductForm />
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

export default ManageProducts;
