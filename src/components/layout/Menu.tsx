import { FaShopify } from "react-icons/fa";
import { menuItems } from "../../constants/menuItems";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Dropdown, MenuProps } from "antd";
import { CustomJwtPayload } from "../../../types";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
const MenuSection = () => {
  const { cartItems } = useAppSelector((state) => state.cart);
  console.log(cartItems)

  const navigate = useNavigate();
  let decoded: any;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwtDecode(token) as CustomJwtPayload;
  }

  function logoutHandler() {
    localStorage.removeItem("token");
    navigate('/login')
    toast("Logged out successfully");
  }

  const items: MenuProps["items"] = [
    
    {
      label: <a href="/dashboard">Dashboard</a>,
      key: "1",
    },
    {
      label: (
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      ),
      key: "0",
    },
    {
      label: <a href="/change-password">Change Password</a>,
      key: "1",
    },
  ];

  return (
    <>
      {/* menu */}
      <div className="navbar bg-bgColor p-0 h-full border-b border-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[300] mt-3 w-52 p-2 shadow"
            >
              {/* mobile menu */}
              {menuItems.map((item) => {
                if(item.access === "public"){
                  return (
                    <li key={item.title}>
                      <NavLink to={`${item.path}`}>{item.title}</NavLink>
                    </li>
                  )
                }
              })}
            </ul>
          </div>
          <a className="pt-5 hover:text-accentColor" href="/">
            <div className="demo-logo">
              <p className="logo mr-10 relative">
                <span className="text-5xl font-bold">EcoHub</span>
              </p>
            </div>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* desktop menu */}
            {menuItems.map((item) => {
              if (item.access === "public") {
                return (
                  <li key={item.title}>
                    <NavLink to={`${item.path}`}>{item.title}</NavLink>
                  </li>
                );
              }
            })}
          </ul>
        </div>
        <div className="navbar-end items-center">
          <div className="flex gap-2 items-center relative h-8 overflow-hidden">
            {!decoded && (
              <button
                onClick={() => navigate("/register")}
                className="px-2 py-1 rounded-sm bg-slate-700 text-white"
              >
                Register
              </button>
            )}
            {!decoded && (
              <button
                onClick={() => navigate("/login")}
                className="px-2 py-1 rounded-sm bg-primary text-white"
              >
                Login
              </button>
            )}
          </div>
          {decoded && (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <img
                  style={{ height: "40px", objectFit: "contain" }}
                  src="/user.png"
                  alt="user"
                />
              </a>
            </Dropdown>
          )}

          {/* cart menu */}
          <a
            href="/cart"
            className="btn bg-transparent border-none shadow-none relative hover:bg-transparent"
          >
            <FaShopify className="font-bold text-4xl text-primary" />
            <small className="text-xs bg-txtColor text-white w-4 h-4 rounded-full absolute top-1 right-3">
              {cartItems?.length || 0}
            </small>
          </a>
        </div>
      </div>
    </>
  );
};

export default MenuSection;
