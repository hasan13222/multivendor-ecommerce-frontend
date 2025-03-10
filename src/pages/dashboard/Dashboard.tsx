
import {
  useGetMyOrderQuery,
} from "../../redux/features/order/orderApi";
import { Card } from "antd";
import { CustomJwtPayload } from "../../../types";
import { jwtDecode } from "jwt-decode";
import CountUp from "react-countup";
import MySuccessOrder from "../order/MySuccessOrder";
import VendorDashboard from "./VendorDashboard";
import AdminDashboard from "./AdminDashboard";

const Dashboard = () => {

  let decoded: any;
  const token = localStorage.getItem("token");
  if (token) {
    decoded = jwtDecode(token) as CustomJwtPayload;
  }

  const { data: customerProducts } = useGetMyOrderQuery({});



  
  return (
    <>
      <h2 className="font-bold text-2xl mb-2">Dashboard</h2>
      {decoded?.role === "Vendor" && (
        <VendorDashboard/>
      )}
      {decoded?.role === "Customer" && (
        <>
          <Card title="Summary">
            <div className="grid grid-cols-2 gap-4">
              <Card
                type="inner"
                title="My Total Order"
                extra={<a href="my-order">Details</a>}
              >
                <p className="text-xl font-semibold">
                  <CountUp end={customerProducts?.data?.length} />
                </p>
              </Card>
              <Card
                type="inner"
                title="Order Successful"
                extra={<a href="my-order">Details</a>}
              >
                <p className="text-xl font-semibold">
                  <CountUp
                    end={
                      customerProducts?.data?.filter(
                        (item: any) => item.status === "Delivered"
                      ).length
                    }
                  />
                </p>
              </Card>
            </div>

            {/* successful order */}
            <MySuccessOrder />
          </Card>
        </>
      )}
      {decoded?.role === "Admin" && (
        <AdminDashboard/>
      )}
    </>
  );
};

export default Dashboard;
