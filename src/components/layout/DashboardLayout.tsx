import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../../types";
import { menuItems } from "../../constants/menuItems";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button, Drawer } from "antd";
import { FaBars } from "react-icons/fa";
import '../../styles/dashboard.css'
const DashboardLayout = ({children}: any) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  let decoded: any;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwtDecode(token) as CustomJwtPayload;
  }

  return (
    <div className="dashboard container mx-auto px-3 py-8">
      <div className="flex gap-5">
        <Drawer
          title="Sidebar"
          placement={"left"}
          closable={false}
          onClose={onClose}
          open={open}
          key={"left"}
        >
          <ul className=" ">
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to={`dashboard`}>
                Dashboard
              </NavLink>
            </li>
            {menuItems.map((item) => {
              if (item.access === decoded?.role) {
                return (
                  <li
                    className="bg-white mb-2 rounded-md hover:bg-slate-50"
                    key={item.title}
                  >
                    <NavLink
                      className="w-full inline-block p-2"
                      to={`${item.path}`}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </Drawer>
        <Button
          className="inline-block sm:hidden bg-slate-400 text-white"
          onClick={showDrawer}
        >
          <FaBars />
        </Button>
        <div className="sidebar w-[240px] hidden sm:block bg-slate-400 rounded-md p-3">
          <ul className="">
            <li className="bg-white mb-2 rounded-md hover:bg-slate-50">
              <NavLink className="w-full inline-block p-2" to={`/dashboard`}>
                Dashboard
              </NavLink>
            </li>
            {menuItems.map((item) => {
              if (item.access === decoded?.role) {
                return (
                  <li
                    className="bg-white mb-2 rounded-md hover:bg-slate-50"
                    key={item.title}
                  >
                    <NavLink
                      className="w-full inline-block p-2"
                      to={`${item.path}`}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
