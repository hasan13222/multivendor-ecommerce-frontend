import { useForm } from "react-hook-form";
import { CustomError } from "../../types/baseQueryApi";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/category/categoryApi";
import { Spin } from "antd";
import { content } from "../ui/Loading";
import { toast } from "sonner";

const CategoryForm = ({ formMode, catName, catId, setCatModalOpen }:any) => {
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues: {name: catName}});

  const [updateCategory, { isLoading, isError, error }] =
    useUpdateCategoryMutation(undefined);
  const [
    createCategory,
    { isLoading: iscreateCatL, isError: isCreateCatErr, error: catErr },
  ] = useCreateCategoryMutation(undefined);

  // getting client contact message
  const onSubmit = async (data: any) => {
    if (formMode === "add") {
      const result = await createCategory(data);
      if (result.data) {
        setCatModalOpen(false);
        toast("Category added successfully");
      }
    } else {
        const updatedCategory = await updateCategory({id: catId, payload: {name: data.name}})
        if (updatedCategory.data){
            setCatModalOpen(false);
            toast("Category updated successfully")
        } else{
            setCatModalOpen(false);
            toast("Category not updated")
        }
    }
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Category Name</label>
          <input
            type="name"
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("name", { required: true })}
          />
          <p className="text-red-500">
            {errors.name && <span>This field is required</span>}
          </p>
        </div>
        {isError && (
          <p className="text-rose-500">
            {(error as CustomError).data?.message}
          </p>
        )}
        {isCreateCatErr && (
          <p className="text-rose-500">
            {(catErr as CustomError).data?.message}
          </p>
        )}
        {isLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {iscreateCatL && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        <input
          className="btn bg-primary text-white hover:bg-black"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default CategoryForm;
