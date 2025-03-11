import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CustomError } from "../../types/baseQueryApi";
import { Spin } from "antd";
import { content } from "../ui/Loading";
import { useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { useLazyGetCouponQuery } from "../../redux/features/coupon/couponApi";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import {
  useOrderPaymentMutation,
  usePlaceOrderMutation,
} from "../../redux/features/order/orderApi";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/features/cart/cartSlice";

const CheckoutForm = () => {
  const [loading, setLoading] = useState(false);
  const [discount, setDiscount] = useState(0);
  // get coupon
  const [getCoupon] = useLazyGetCouponQuery();

  const couponRef = useRef<HTMLInputElement>(null);

  const { state } = useLocation();

  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const [doPayment, { isLoading, isError, error }] =
    useOrderPaymentMutation(undefined);
  const [doOrder] = usePlaceOrderMutation(undefined);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  if (isError) {
    console.log(error);
    toast.error((error as CustomError).data.message, {
      duration: 3000,
      position: "top-right",
    });
  }

  const navigate = useNavigate();
  // checkout functionality
  const onSubmit = async (data: any) => {
    placeOrder(data);
  };

  async function couponHandler() {
    const coupon = await getCoupon(couponRef.current!.value);
    if (coupon.data.data) {
      setDiscount(coupon?.data?.data?.discount);
    } else {
      toast.warning("Coupon Code is not valid");
    }
  }

  const placeOrder = async (billingData: any) => {
    setLoading(true);
    if (!stripe || !elements) {
      toast.error("Stripe element is not found");
      setLoading(false);
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      toast.error("card is not found");
      setLoading(false);
      return;
    }

    // const { error, paymentMethod } = await stripe.createPaymentMethod({
    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      toast("payment error");
      setLoading(false);
      return;
    }
    const cartItems = localStorage.getItem("cartItems");
    const cartPrds = JSON.parse(cartItems as string);
    const completePayment = await doPayment({
      ...billingData,
      amount: state.totalPrice - discount,
      productId: cartPrds[0].productId,
    });
    if (completePayment?.data?.success) {
      await stripe
        .confirmCardPayment(completePayment.data.data.clientSecret, {
          payment_method: {
            card: card,
            billing_details: {
              name: billingData.data?.name,
              email: billingData.data?.email,
            },
          },
        })
        .then(async function (result) {
          if (result.error) {
            toast("Your payment failed");

            setLoading(false);
          }
          if (result.paymentIntent) {
            const orderResult = await doOrder(JSON.parse(cartItems as string));
            if (orderResult.data?.success) {
              localStorage.removeItem("cartItems");
              setLoading(false);
              dispatch(setCart([]));
              toast("Order Placed Success");
              navigate("/");
            } else {
              setLoading(false);
            }
          }
        });
    }
  };
  return (
    <>
      {/* checkout form */}
      <form
        className="flex flex-col gap-3 max-w-[400px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* billing details */}
        <h3 className="font-semibold text-lg">Billing Details</h3>
        <div className="flex flex-col">
          <label>Full Name</label>
          <input
            className="py-2 border rounded-md px-2"
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
            {...register("email", { required: true })}
          />
          <p className="text-red-500">
            {errors.email && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Phone Number</label>
          <input
            className="py-2 border rounded-md px-2"
            {...register("phone", { required: true })}
          />
          <p className="text-red-500">
            {errors.phone && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>City</label>
          <input
            className="py-2 border rounded-md px-2"
            {...register("city", { required: true })}
          />
          <p className="text-red-500">
            {errors.city && <span>This field is required</span>}
          </p>
        </div>
        <div className="flex flex-col">
          <label>Delivery Address</label>
          <textarea
            className="py-2 border rounded-md px-2"
            {...register("full_address", { required: true })}
          ></textarea>

          <p className="text-red-500">
            {errors.full_address && <span>This field is required</span>}
          </p>
        </div>

        {/* payment details */}
        <h3 className="font-semibold text-lg">Payment Details</h3>
        {/* <div className="flex gap-2">
          <input
            checked
            value="cash"
            className="py-2 border rounded-md px-2"
            type="radio"
            {...register("payment_option", { required: true })}
          />
          <label>Cash On Delivery</label>
        </div>
        <p className="text-red-500">
          {errors.payment_option && <span>This field is required</span>}
        </p> */}
        <div className="gap-2">
          <p>Use "B71" to get Bijoy Dibash discount.</p>
          <br />
          <input
            className="border px-2 py-1 rounded-sm"
            ref={couponRef}
            type="text"
            placeholder="Coupon code"
          />
          <button
            type="button"
            className="bg-orange-300 py-1 px-2"
            onClick={couponHandler}
          >
            Apply
          </button>
        </div>
        <p>You have got ${discount} Disount</p>
        <p>Please pay ${(state.totalPrice - discount).toFixed(2)}</p>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div>
          <input
            className="btn bg-primary text-white hover:bg-black"
            type="submit"
            value="Place Order"
          />
        </div>
      </form>

      {isLoading && (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      )}
      {loading && (
        <Spin tip="Loading" size="large">
          {content}
        </Spin>
      )}
    </>
  );
};

export default CheckoutForm;
