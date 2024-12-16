import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/authApi";

const RegisterForm = () => {
  // react hook form options
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [signup] = useRegisterMutation(undefined);

  const navigate = useNavigate();
  // getting client contact message
  const onSubmit = async (data: any) => {
    const user = await signup(data);
    if(user.data){
      navigate('/login');
    }
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
          <label>Role</label>
          <select
            className="py-2 border rounded-md px-2"
            defaultValue="Customer"
            {...register("role", { required: false })}
          >
            <option value="Customer">Customer</option>
            <option value="Vendor">Vendor</option>
          </select>
        </div>
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

        <input
          className="btn bg-primary text-white hover:bg-black"
          type="submit"
          value="Submit"
        />
      </form>
    </>
  );
};

export default RegisterForm;
