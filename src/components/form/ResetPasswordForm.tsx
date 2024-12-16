import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {  useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { CustomError } from "../../types/baseQueryApi";

const ResetPasswordForm = () => {
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [resetPassword, { isError, error }] =
    useResetPasswordMutation(undefined);

  const navigate = useNavigate();
  // getting client contact message
  const onSubmit = async (data: any) => {
    const user = await resetPassword(data);
    if (user.data) {
      navigate("/");
    }
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>New Password</label>
          <input
            type="newPassword"
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("newPassword", { required: true })}
          />
          <p className="text-red-500">
            {errors.newPassword && <span>This field is required</span>}
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

export default ResetPasswordForm;
