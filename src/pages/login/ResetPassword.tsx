import { useSearchParams } from "react-router-dom";
import ResetPasswordForm from "../../components/form/ResetPasswordForm";

const ChangePassword = () => {
  const [searchParams] = useSearchParams();

  // Get query parameters
  const token = searchParams.get("token");
  if (token) {
    localStorage.setItem("token", token);
  }

  return (
    <div className="contact_us container mx-auto px-3 py-8">
      <h2 className="font-bold text-3xl mb-2">Reset Password</h2>
      <div className="grid grid-cols-2">
        <div className="col-span-2 sm:col-span-1">
          <ResetPasswordForm />
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
