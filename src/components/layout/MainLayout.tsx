import {  Layout, } from "antd";
import HeaderSection from "./Header";
import { Outlet } from "react-router-dom";
import FooterSection from "./Footer";

const {  Content, Footer } = Layout;


const MainLayout = () => {

  return (
    <>
    {/* project main layout */}
      <Layout className="font-inter bg-bgColor">
        <HeaderSection/>
        <Content style={{ padding: "0" }}>
          <Outlet/>
          
        </Content>
        <Footer >
          <FooterSection/>
        </Footer>
      </Layout>
    </>
  );
};

export default MainLayout;
