import { useForm } from "react-hook-form";
import { CustomError } from "../../types/baseQueryApi";

import { Spin } from "antd";
import { content } from "../ui/Loading";
import { toast } from "sonner";
import { useCreateCouponMutation, useUpdateCouponMutation } from "../../redux/features/coupon/couponApi";

const CouponForm = ({ formMode, couponName,couponCode, couponDiscount, couponId, setCouponModalOpen }:any) => {

    console.log({ formMode, couponName,couponCode, couponDiscount, couponId, setCouponModalOpen })
  // react hook form options
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({defaultValues: {name: couponName, code: couponCode, discount: couponDiscount}});

  const [updateCoupon, { isLoading, isError, error }] =
    useUpdateCouponMutation(undefined);
  const [
    createCoupon,
    { isLoading: iscreateCouponL, isError: isCreateCouponErr, error: couponErr },
  ] = useCreateCouponMutation(undefined);

  // getting client contact message
  const onSubmit = async (data: any) => {
    if (formMode === "add") {
      const result = await createCoupon({...data, discount: Number(data.discount)});
      if (result.data) {
        reset();
        setCouponModalOpen(false);
        toast("Coupon added successfully");
      }
    } else {
        const updatedCoupon = await updateCoupon({id: couponId, payload: {name: data.name, code: data.code, discount: Number(data.discount)}})
        if (updatedCoupon.data){
            reset();
            setCouponModalOpen(false);
            toast("Coupon updated successfully")
        } else{
            setCouponModalOpen(false);
            toast("Coupon not updated")
        }
    }
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Coupon Name</label>
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
        <div className="flex flex-col">
          <label>Coupon Name</label>
          <input
            type="text"
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("code", { required: true })}
          />
          <p className="text-red-500">
            {errors.code && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Discount</label>
          <input
            type="number"
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("discount", { required: true })}
          />
          <p className="text-red-500">
            {errors.discount && <span>This field is required</span>}
          </p>
        </div>
        {isError && (
          <p className="text-rose-500">
            {(error as CustomError).data?.message}
          </p>
        )}
        {isCreateCouponErr && (
          <p className="text-rose-500">
            {(couponErr as CustomError).data?.message}
          </p>
        )}
        {isLoading && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {iscreateCouponL && (
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

export default CouponForm;
