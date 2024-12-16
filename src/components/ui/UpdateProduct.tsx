import { Space } from "antd";
import { useDeleteProductMutation, useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { CustomError } from "../../types/baseQueryApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setFormMode, setmodalOpen, setProductId } from "../../redux/features/product/productSlice";

const UpdateProduct = ({ id }: { id: string }) => {
  // redux dispatch
  const dispatch = useAppDispatch();

  // redux product state
  const { productId } = useAppSelector(
    (state) => state.product
  );

  // rtk single product fetch
  const { refetch } = useGetSingleProductQuery(productId);

  // rtk delete product
  const [deleteProduct, { isError, error }] = useDeleteProductMutation();

  // update product state handler before query
  const handleUpdate = (id: string) => {
    dispatch(setFormMode("update"))
    dispatch(setmodalOpen(true))
    dispatch(setProductId(id));
    refetch();
  };

  // duplicate product
  const handleDuplicate = (id: string) => {
    dispatch(setFormMode("add"))
    dispatch(setmodalOpen(true))
    dispatch(setProductId(id));
    refetch();
  };

  // product delete query
  const handleDelete = async (id: string) => {
    const res = await deleteProduct(id);

    if (res?.data?.success) {
      toast.success("Product Deleted successfully!", { duration: 2000, position: "top-right" });
    }

    if (isError) {
      toast.error((error as CustomError).data.message, {
        duration: 3000,
        position: "top-right"
      });
    }
  };

  return (
    // action buttons in product list to manage product
    <Space size="middle">
      <button
        onClick={() => handleUpdate(id)}
        className="text-primary hover:text-txtColor font-bold"
      >
        Update
      </button>
      <button
        onClick={() => handleDuplicate(id)}
        className="text-secondary hover:text-txtColor font-bold"
      >
        Duplicate
      </button>
      <span>/</span>
      <button
        onClick={() => handleDelete(id)}
        className="text-rose-500 hover:text-txtColor font-bold"
      >
        Delete
      </button>
    </Space>
  );
};

export default UpdateProduct;
