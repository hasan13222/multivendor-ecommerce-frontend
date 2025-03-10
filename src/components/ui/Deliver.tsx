import { Button,  } from "antd";
import { toast } from "sonner";
import { useChangeOrderStatusMutation } from "../../redux/features/order/orderApi";

const Deliver = ({ orderItem }: any) => {
  const [cancelOrder] = useChangeOrderStatusMutation(orderItem);
  

  async function cancelOrderHandler(){
    const cancel = await cancelOrder({id: orderItem.id, body: {status: "Cancelled"}});
    if(cancel.data){
      toast("Order cancelled successfully")
    }
  } 
  async function deliverOrderHandler(){
    const deliver = await cancelOrder({id: orderItem.id, body: {status: "Delivered"}});
    if(deliver.data){
      toast("Order Delivered successfully")
    }
  } 
  return (
    <>
      {orderItem?.status === "Processing" && <Button className="mr-1 bg-red-500" onClick={() => cancelOrderHandler()}>Cancel</Button>}
      {orderItem?.status === "Processing" && <Button className="bg-green-500" onClick={() => deliverOrderHandler()}>Deliver</Button>}
      
    </>
  );
};

export default Deliver;
