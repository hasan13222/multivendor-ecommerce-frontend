import { useForm } from "react-hook-form";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import { CustomError } from "../../types/baseQueryApi";
import { toast } from "sonner";

const ForgetPasswordForm = () => {
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [forgetPassword, { isError, error }] =
    useForgetPasswordMutation(undefined);

  // getting client contact message
  const onSubmit = async (data: any) => {
    const user = await forgetPassword(data);
    if (user.data) {
      toast("Please check email to reset your password")
    }
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.name : ""}
            {...register("email", { required: true })}
          />
          <p className="text-red-500">
            {errors.email && <span>This field is required</span>}
          </p>
        </div>
        {isError && (
          <p className="text-rose-500">
            {(error as CustomError).data?.message}
          </p>
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

export default ForgetPasswordForm;
