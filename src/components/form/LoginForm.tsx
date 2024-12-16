import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { CustomError } from "../../types/baseQueryApi";

const LoginForm = () => {
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login, {isError, error}] = useLoginMutation(undefined);

  const navigate = useNavigate();
  // getting client contact message
  const onSubmit = async (data: any) => {
    const user = await login(data);
    if (user.data) {
      localStorage.setItem("token", user.data?.data?.token);
      localStorage.setItem("refreshToken", user.data?.data?.refreshToken);
      navigate("/");
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
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("password", { required: true })}
          />
          <p className="text-red-500">
            {errors.password && <span>This field is required</span>}
          </p>
        </div>
        <p>Forget Password? <button type="button" onClick={() => navigate('/forget-password')} className="underline">Reset Password</button></p>
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

export default LoginForm;
