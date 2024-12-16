import { IoMdLocate } from "react-icons/io";
import ContactForm from "../../components/form/ContactForm";
import { CiMail } from "react-icons/ci";
import { MdOutlinePhoneInTalk } from "react-icons/md";

const Contact = () => {
  return (
    <>
      <div className="contact_us container mx-auto px-3 py-8">
        <div className="max-w-[600px]">
          <div className="contact_left">
            <h2 className="font-bold text-3xl mb-2">Contact Us</h2>
            <ul>
              <li className="flex items-start gap-1">
                <IoMdLocate className="mt-1" />{" "}
                <span>15/2C, Heritage Home, East London, England</span>
              </li>
              <li className="flex items-start gap-1">
                <CiMail className="mt-1" />
                <span>demo@mail.com</span>
              </li>
              <li className="flex items-start gap-1">
                <MdOutlinePhoneInTalk className="mt-1" />
                <span>019524855455</span>
              </li>
            </ul>
          </div>
          <div className="contact_right">
            <h3 className="font-bold text-lg mt-3 mb-1">Send Us Your Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
