import { Layout } from "antd";
import MenuSection from "./Menu";
import '../../styles/header.css'

const { Header } = Layout;

const HeaderSection = () => {
  return (
    <>
      <Header
      className="text-primary bg-bgColor"
        style={{
          display: "flex",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex:1
        }}
      >
        <MenuSection />
      </Header>
      
    </>
  );
};

export default HeaderSection;
