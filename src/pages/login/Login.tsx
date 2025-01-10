import LoginForm from "../../components/form/LoginForm";

const Login = () => {
    return (
        <div className="contact_us container mx-auto px-3 py-8">
            <h2 className="font-bold text-3xl mb-2">Login</h2>
            <div className="grid grid-cols-2 items-center">
                <div className="col-span-2 sm:col-span-1">
                <LoginForm/>
                </div>
                <div className="col-span-2 sm:col-span-1 max-h-[700px]">
                 <img className="object-contain" src="/login.svg" alt="login" />
                </div>
            </div>
            
        </div>
    );
};

export default Login;