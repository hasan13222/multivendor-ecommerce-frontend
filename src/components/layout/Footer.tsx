import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

const FooterSection = () => {
  return (
    <>
      <footer className="footer bg-bgColor border-t text-base-content p-10 justify-between">
        <nav>
          <h6 className="footer-title text-txtColor opacity-100">Services</h6>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <h6 className="footer-title text-txtColor opacity-100">Company</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-txtColor opacity-100">Useful LInks</h6>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <h6 className="footer-title text-txtColor opacity-100">Social</h6>
          <div className="flex flex-col gap-3">
            <div className="grid grid-flow-col gap-4">
              <a href="/">
                <FaFacebook />
              </a>
              <a href="/">
                <FaLinkedin />
              </a>
            </div>
            <div className="grid grid-flow-col gap-4">
              <a href="/">
                <FaXTwitter />
              </a>
              <a href="/">
                <FaYoutube />
              </a>
            </div>
            <div className="grid grid-flow-col gap-4">
              <a href="/">
                <FaInstagramSquare />
              </a>
            </div>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default FooterSection;
