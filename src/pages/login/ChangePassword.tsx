import ChangePasswordForm from "../../components/form/ChangePasswordForm";


const ChangePassword = () => {
    return (
        <div className="contact_us container mx-auto px-3 py-8">
            <h2 className="font-bold text-3xl mb-2">ChangePassword</h2>
            <div className="grid grid-cols-2">
                <div className="col-span-2 sm:col-span-1">
                <ChangePasswordForm/>
                </div>
            </div>
            
        </div>
    );
};

export default ChangePassword;