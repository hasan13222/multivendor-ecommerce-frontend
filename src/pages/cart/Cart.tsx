import { Spin } from "antd";
import { useGetCartProductsQuery } from "../../redux/features/cart/cartApi";
import { useAppSelector } from "../../redux/hooks";
import { TCartItem } from "../products/SingleProduct";
import { content } from "../../components/ui/Loading";
import { TProduct } from "../../types/productType";
import { useDispatch } from "react-redux";
import { setCart } from "../../redux/features/cart/cartSlice";
import { toast } from "sonner";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  // redux cart state
  const { cartItems, cartItemIds } = useAppSelector((state) => state.cart);

  // get products query those are in cart
  const {
    data: cartProducts,
    isError,
    isFetching,
  }: Record<string, any> = useGetCartProductsQuery(cartItemIds);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // cart item quantity increment handler
  const increaseCartHandler = (productId: string) => {
    const increasedQtyItems = cartItems.map((item: TCartItem) =>
      item.productId === productId ? { ...item, qty: item.qty + 1 } : item
    );
    localStorage.setItem("cartItems", JSON.stringify(increasedQtyItems));
    dispatch(setCart(increasedQtyItems));
  };

  // cart item quantity decrement handler
  const decreaseCartHandler = (productId: string) => {
    const decreasedQtyItems = cartItems.map((item: TCartItem) => {
      if (item.productId === productId) {
        if (item.qty === 1) {
          toast("Qty reached the minimum limit");
          return;
        } else {
          return { ...item, qty: item.qty - 1 };
        }
      }
      return item;
    });
    localStorage.setItem("cartItems", JSON.stringify(decreasedQtyItems));
    dispatch(setCart(decreasedQtyItems));
  };

  // remove cart item handler
  const removeCartHandler = (id: string) => {
    const FilterCartItems = cartItems.filter(
      (item: TCartItem) => item.productId !== id
    );

    localStorage.setItem("cartItems", JSON.stringify(FilterCartItems));
    dispatch(setCart(FilterCartItems));
  };

  // calculate subtotal for items added to cart
  const subtotal = cartProducts?.data?.reduce((acc: number, item: TProduct) => {
    const itemIndex = cartItemIds.indexOf(item.id);
    return acc + item?.price * cartItems[itemIndex]?.qty;
  }, 0);

  // while changing quantity, check item is stock out or not
  const isAnyCartItemStockOut = cartProducts?.data?.find((item: TProduct) => {
    const itemIndex = cartItemIds.indexOf(item.id);
    return item.stock < cartItems[itemIndex]?.qty;
  });

  const proceedCheckoutHandler = () => {
    navigate("/checkout", {state: {totalPrice: subtotal + subtotal * 0.15}});
  };
  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Cart</h2>
        {cartItems?.length === 0 && (<p>You have no products in your cart.</p>)}
        {isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>You have no product in cart</p>}

        {cartItems?.length > 0 && (
          <div className="cart_price grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* cart products */}
            <div className="cart_products overflow-auto col-span-2 w-full">
              <table className="w-full min-w-[500px]">
                <tr>
                  <th className="border py-2">Items</th>
                  <th className="border py-2">Price</th>
                  <th className="border py-2">Quantity</th>
                  <th className="border py-2">Total</th>
                  <th className="border py-2">Action</th>
                </tr>
                {cartProducts?.data.map((product: TProduct) => {
                  const productIndex = cartItemIds.indexOf(product.id);

                  return (
                    <tr id={product.id}>
                      <td className="border p-5 text-center">
                        <div className="img-wrap flex justify-center">
                          <img
                            className="w-[75px] h-auto object-contain"
                            src={product?.images[0]}
                            alt=""
                          />
                        </div>

                        <p className="text-center">{product.name}</p>
                      </td>
                      <td className="border p-5 text-center">
                        ${product.price}
                      </td>
                      <td className="border p-5 text-center">
                        <button
                          onClick={() =>
                            decreaseCartHandler(product.id as string)
                          }
                          className="p-1 px-2 bg-gray-200"
                        >
                          -
                        </button>
                        <span className="p-1 px-2 bg-gray-50">
                          {cartItems[productIndex]?.qty}
                        </span>
                        <button
                          onClick={() =>
                            increaseCartHandler(product.id as string)
                          }
                          className="p-1 px-2 bg-gray-200"
                        >
                          +
                        </button>
                        {isAnyCartItemStockOut?.id === product.id && (
                          <p>The Item is stock out</p>
                        )}
                      </td>
                      <td className="border p-5 text-center">
                        {cartItems[productIndex]?.qty * product.price}
                      </td>
                      <td className="border p-5 text-center">
                        <button
                          onClick={() =>
                            removeCartHandler(product.id as string)
                          }
                          className="btn px-2 min-h-8 h-8 btn-error text-white"
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </table>
            </div>

            {/* price details */}
            <div className="price_details card mt-0 m-8 p-5 border border-green-500 rounded-md">
              <h2 className="font-semibold text-lg mb-5">Price Summary</h2>
              <div className="items">
                <div className="item mb-2 flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="item mb-2 flex justify-between">
                  <span>Vat (15%)</span>
                  <span>${(subtotal * 0.15).toFixed(2)}</span>
                </div>
                <div className="total item border-t flex justify-between border-gray-300 my-3 pt-2">
                  <span className="font-bold">Total</span>
                  <span className="font-bold">
                    ${(subtotal + subtotal * 0.15).toFixed(2)}
                  </span>
                </div>
              </div>
              <button
                onClick={proceedCheckoutHandler}
                disabled={isAnyCartItemStockOut}
                className="btn btn-success text-white"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
