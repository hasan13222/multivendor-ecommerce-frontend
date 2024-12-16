import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { CustomError } from "../../types/baseQueryApi";

const ChangePasswordForm = () => {
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changePassword, {isError, error}] = useChangePasswordMutation(undefined);

  const navigate = useNavigate();
  // getting client contact message
  const onSubmit = async (data: any) => {
    const user = await changePassword(data);
    if (user.data) {
      navigate("/");
    }
  };
  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <label>Old Password</label>
          <input
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.name : ""}
            {...register("oldPassword", { required: true })}
          />
          <p className="text-red-500">
            {errors.oldPassword && <span>This field is required</span>}
          </p>
        </div>
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
        {isError && <p className="text-rose-500">{(error as CustomError).data?.message}</p>}
        <input
          className="btn bg-primary text-white hover:bg-black"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default ChangePasswordForm;
