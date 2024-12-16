import { useForm } from "react-hook-form";
import {
  useCreateShopMutation,
  useGetMyShopQuery,
  useUpdateShopMutation,
} from "../../redux/features/shop/shopApi";
import { toast } from "sonner";
import { useRef } from "react";
import axios from "axios";

const ShopForm = ({ setShopModalOpen }: any) => {
  const { data: myshop } = useGetMyShopQuery(undefined);
  type TShop = {
    name?: string;
    description?: string;
    logo?: string;
  };
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TShop>({
    defaultValues: {
      name: myshop?.data?.name,
      description: myshop?.data?.description,
    },
  });

  const [createShop] = useCreateShopMutation(undefined);
  const [updateShop] = useUpdateShopMutation(undefined);

  const shopLogoRef = useRef<HTMLInputElement>(null);

  // getting client contact message
  const onSubmit = async (data: any) => {
    if (myshop?.data) {
      if (shopLogoRef?.current?.files instanceof FileList) {
        await axios
          .post(
            `https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734`,
            { image: shopLogoRef?.current?.files[0] },
            {
              headers: { "content-Type": "multipart/form-data" },
            }
          )
          .then(async (uploadedImgData) => {
            const updatedShop = await updateShop({
              shopId: myshop?.data?.id,
              payload: {...data, logo: uploadedImgData.data.data.display_url},
            });
            if (updatedShop.data) {
              toast("shop updated successfully");
            } else {
              toast("shop update failed");
            }
          })
          .catch(async () => {
            const updatedShop = await updateShop({
              shopId: myshop?.data?.id,
              payload: data,
            });
            if (updatedShop.data) {
              toast("shop updated successfully");
            } else {
              toast("shop update failed");
            }
          });
      }

      
    } else {
      if (shopLogoRef?.current?.files instanceof FileList) {
        await axios
          .post(
            `https://api.imgbb.com/1/upload?key=787a92272c8fe84458fd69331f72c734`,
            { image: shopLogoRef?.current?.files[0] },
            {
              headers: { "content-Type": "multipart/form-data" },
            }
          )
          .then(async (uploadedImgData) => {
            const createdShop = await createShop({...data, logo: uploadedImgData.data.data.display_url});
            if (createdShop.data) {
              toast("shop created successfully");
            } else {
              toast("shop create failed");
            }
          })
          .catch(async () => {
            const createdShop = await createShop(data);
            if (createdShop.data) {
              toast("shop created successfully");
            } else {
              toast("shop create failed");
            }
          });
      }
    }

    setShopModalOpen(false);
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.name : ""}
            {...register("name", { required: true })}
          />
          <p className="text-red-500">
            {errors.name && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Description</label>
          <textarea
            className="py-2 border rounded-md px-2"
            {...register("description", { required: false })}
          ></textarea>
        </div>

        <div className="flex flex-col">
          <label htmlFor="image">Bike Image</label>
          <input ref={shopLogoRef} type="file" />
        </div>

        <input
          className="btn bg-primary text-white hover:bg-black"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default ShopForm;
