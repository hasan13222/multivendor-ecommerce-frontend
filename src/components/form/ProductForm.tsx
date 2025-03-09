import { useForm, SubmitHandler } from "react-hook-form";
import { TProductInput } from "../../types/productType";
import { useEffect, useMemo, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setLoading,
  setmodalOpen,
} from "../../redux/features/product/productSlice";
import {
  useAddProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { toast } from "sonner";
import { CustomError } from "../../types/baseQueryApi";
import axios from "axios";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export default function ProductForm({shopId}:any) {  
  const [value, setValue] = useState('');

  // redux product state
  const { formMode, productId } = useAppSelector((state) => state.product);


  // single product fetch
  const { data } = useGetSingleProductQuery(productId);

  // get categories
  const { data: categories } = useGetCategoriesQuery(undefined);

  // add product query
  const [addProduct, { isError, error }] = useAddProductMutation();
  console.log(error);

  // update product query
  const [updateProduct, { isError: isUpdateError, error: UpdateError }] =
    useUpdateProductMutation();

  // redux dispatch
  const dispatch = useAppDispatch();

  // populate product data when update
  const name = data?.data?.name || "";
  const code = data?.data?.code || "";
  const description = data?.data?.description || "";
  const categoryId = data?.data?.category?.id || "";
  const stock = data?.data?.stock || "";
  const price = data?.data?.price || "";
  const discount = data?.data?.discount || "";

  // usememo to toggle form data when updating and adding product
  const defaultValues = useMemo(() => {
    if (formMode === "add") {
      return {};
    } else if (formMode === "update") {
      return { name, code, description, price, discount, categoryId, stock };
    }
  }, [name, code, description, price, discount, categoryId, stock, formMode]);

  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TProductInput>({ defaultValues });

  const productImgRef = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<TProductInput> = async (data) => {
    // loading true until add or update product finished
    dispatch(setLoading(true));

    data.stock = Number(data.stock);
    data.price = Number(data.price);
    data.discount = Number(data.discount);
    let images: string[] = [];

    if (productImgRef?.current?.files instanceof FileList) {
      const imageAttachmentFiles = Array.from(productImgRef?.current?.files);

      // Create an array of promises for image uploads
      const uploadPromises = imageAttachmentFiles.map(async (item) => {
        const formData = new FormData();
        formData.append("image", item);

        const imgData = await axios.post(
          `https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        return imgData.data.data.display_url; // Return the uploaded image URL
      });

      // Wait for all uploads to complete
      images = await Promise.all(uploadPromises);
    }

    let res;

    // toggle add and update
    if (formMode === "add") {
      res = await addProduct({...data, images, shopId, long_description: value});
    }

    if (formMode === "update") {
      res = await updateProduct({ productId, data: {...data, images: images.length === 0 ? data?.images : images, shopId, long_description: value} });
    }

    // success message after add or update
    if (res?.data?.success) {
      reset();
      dispatch(setLoading(false));
      dispatch(setmodalOpen(false));
      toast.success(res?.data?.message, {
        duration: 2000,
        position: "top-right",
      });
    } else{
      dispatch(setLoading(false));
      dispatch(setmodalOpen(false));
    }

    // add product error handler
    if (isError) {
      dispatch(setmodalOpen(false));
      toast.error((error as CustomError).data.message, {
        duration: 3000,
        position: "top-right",
      });
    }

    // update product error handler
    if (isUpdateError) {
      console.log(UpdateError);
      dispatch(setmodalOpen(false));
      toast.error((UpdateError as CustomError).data.message, {
        duration: 3000,
        position: "top-right",
      });
    }
  };

  // reset form data when form works as add product form
  useEffect(() => {
    setValue(data?.data?.long_description);
    reset(defaultValues);
    if (formMode === "add") {
      reset({});
      setValue("")
    }
  }, [data?.data?.image, reset, defaultValues, formMode]);

  return (
    // product add and update form
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label>Product Name</label>
        <input
          className="py-2 border rounded-md px-2"
          {...register("name", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.name && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>code</label>
        <input
          className="py-2 border rounded-md px-2"
          {...register("code", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.code && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Category</label>
        <select
          className="py-2 border rounded-md px-2"
          
          {...register("categoryId", { required: formMode === "add" })}
        >
          <option value="0" disabled>Select Category</option>
          {categories?.data.map((category: any) => (
            <option value={category.id} key={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <p className="text-red-500">
          {errors.categoryId && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Short Descritption</label>
        <input
          className="py-2 border rounded-md px-2"
          {...register("description", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.description && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Descritption, Features & Specifications</label>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
      </div>
      <div className="flex flex-col">
        <label>Stock Quantity</label>
        <input
          type="number"
          className="py-2 border rounded-md px-2"
          {...register("stock", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.stock && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>Price</label>
        <input
          type="number"
          className="py-2 border rounded-md px-2"
          {...register("price", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.price && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label>discount</label>
        <input
          type="number"
          className="py-2 border rounded-md px-2"
          {...register("discount", { required: formMode === "add" })}
        />
        <p className="text-red-500">
          {errors.discount && <span>This field is required</span>}
        </p>
      </div>
      <div className="flex flex-col">
        <label htmlFor="image">Image</label>
        <input multiple ref={productImgRef} type="file" />
      </div>

      <input
        className="btn bg-primary text-white"
        type="submit"
        value={formMode === "add" ? "Add Product" : "Update Product"}
      />
    </form>
  );
}
