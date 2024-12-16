import RegisterForm from "../../components/form/RegisterForm";

const Register = () => {
  return (
    <div className="contact_us container mx-auto px-3 py-8">
      <h2 className="font-bold text-3xl mb-2">Register</h2>
      <div className="grid grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
