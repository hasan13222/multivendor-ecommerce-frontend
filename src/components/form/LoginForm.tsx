import { useForm } from "react-hook-form";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import { CustomError } from "../../types/baseQueryApi";
import { useEffect, useMemo, useState } from "react";

const LoginForm = () => {
  const [dfEmail, setDfEmail] = useState("");
  const [dfPassword, setDfPassword] = useState("");

  
  const defaultValues = useMemo(() => {
    return {email: dfEmail, password: dfPassword}
  }, [dfEmail, dfPassword]);

  function adminHandler(){
    setDfEmail("jamil8305@gmail.com");
    setDfPassword("123456");
  }
  function vendorHandler(){
    setDfEmail("marzia8305@gmail.com");
    setDfPassword("123456");
  }
  function customerHandler(){
    setDfEmail("customer@gmail.com");
    setDfPassword("123456");
  }
  
  // react hook form options
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({defaultValues});

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

  useEffect(() => {
    reset(defaultValues)
  }, [reset, defaultValues])
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
        <div className="flex gap-3">
          <button className="btn btn-secondary" onClick={adminHandler} type="button">Admin</button>
          <button className="btn btn-secondary" onClick={vendorHandler} type="button">Vendor</button>
          <button className="btn btn-secondary" onClick={customerHandler} type="button">Customer</button>
        </div>
      </form>
    </>
  );
};

export default LoginForm;
