import { Button, ConfigProvider, Modal, Space, Spin } from "antd";
import { FaPlus } from "react-icons/fa6";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import CategoryForm from "../../components/form/CategoryForm";
import { useState } from "react";
import { useDeleteCategoryMutation, useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import { toast } from "sonner";

const ManageCategories = () => {
  const [catFormMode, setCatFormMode] = useState("add");
  const [catModalOpen, setCatModalOpen] = useState(false);
  const [catName, setCatName] = useState("");
  const [catId, setCatId] = useState("");

  // add product state update before query
  const showModal = () => {
    setCatModalOpen(true);
    setCatFormMode("add");
  };

  // close product form modal
  const handleCancel = () => {
    setCatModalOpen(false);
  };

  // get all products
  const {
    data: categories,
    isError,
    error,
    isFetching,
    isLoading,
  } = useGetCategoriesQuery({});

  const [deleteCategory] = useDeleteCategoryMutation(undefined)

  async function updateCategoryHandler(id: string, name: string){
    setCatName(name)
    setCatId(id)
    setCatFormMode("update");
    setCatModalOpen(true);
    
  }
  async function deleteCategoryHandler(id:string){
    const deletedCategory = await deleteCategory(id);
    if (deletedCategory.data){
        toast("Category deleted successfully")
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
      <div className="manage_products container mx-auto px-3 pb-8">
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
              <FaPlus /> Add Categories <span>&nbsp;</span>
            </Button>
          </Space>
        </ConfigProvider>

        {/* modal */}
        <Modal
          title={catFormMode+" category"}
          open={catModalOpen}
          footer={null}
          onCancel={handleCancel}
        >
          <CategoryForm formMode={catFormMode} catName={catName} setCatModalOpen={setCatModalOpen} catId={catId} />
        </Modal>

        {/* products table */}
        <div className="container mx-auto">
          {/* <h2 className="font-bold text-3xl my-5">All Categories</h2> */}
          <table className="overflow-auto border w-full">
            <thead className="">
              <tr>
                <th className="bg-primary text-white px-3 py-2">Category Name</th>
                <th className="bg-primary text-white px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {categories?.data?.map((item: any) => (
                <tr className="border-b" key={item.id}>
                  <td className="text-center p-3">{item.name}</td>
                  <td className="text-center flex justify-center p-3">
                    <button
                      onClick={() => updateCategoryHandler(item.id, item.name)}
                      className="bg-secondary text-white px-2 py-1"
                    >
                      Update
                    </button>
                    /{" "}
                    <button
                      onClick={() => deleteCategoryHandler(item.id)}
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

export default ManageCategories;
