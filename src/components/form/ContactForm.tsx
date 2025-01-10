import { useForm } from "react-hook-form";
import { useCreateContactMutation } from "../../redux/features/contact/contactApi";
import { toast } from "sonner";

const ContactForm = () => {

  const [addContact] = useCreateContactMutation(undefined)
  // react hook form options
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // getting client contact message
  const onSubmit = async (data:any) => {
    const addedContact = await addContact(data);
    if (addedContact.data){
      toast("Your Message has been sent successfully");
      reset();
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
          <label>Email</label>
          <input
            className="py-2 border rounded-md px-2"
            // defaultValue={!isSPE ? data?.data?.brand : ""}
            {...register("email", { required: true })}
          />
          <p className="text-red-500">
            {errors.email && <span>This field is required</span>}
          </p>
        </div>

        <div className="flex flex-col">
          <label>Message</label>
          <textarea
            className="py-2 border rounded-md px-2"
            {...register("message", { required: true })}
          ></textarea>
          <p className="text-red-500">
            {errors.message && <span>This field is required</span>}
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

export default ContactForm;
