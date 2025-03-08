import { Layout } from "antd";
import MenuSection from "./Menu";
import "../../styles/header.css";
import { FaFacebook, FaInstagramSquare, FaLinkedin } from "react-icons/fa";

const { Header } = Layout;

const HeaderSection = () => {
  return (
    <>
      <div className="topbar bg-secondary py-2 text-white">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <p>Welcome to EcoHub</p>
            <div className="flex gap-5">
              <p>Follow Us at</p>
              <div className="flex items-center gap-4">
                <a href="/">
                  <FaFacebook />
                </a>
                <a href="/">
                  <FaLinkedin />
                </a>
                <a href="/">
                  <FaInstagramSquare />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
      className="bg-bgColor"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
        }}
      >
        <div className="container mx-auto">
          <Header
            className="text-primary bg-bgColor"
            style={{
              display: "flex",
              alignItems: "center",
              padding: 0,
            }}
          >
            <MenuSection />
          </Header>
        </div>
      </div>
    </>
  );
};

export default HeaderSection;
