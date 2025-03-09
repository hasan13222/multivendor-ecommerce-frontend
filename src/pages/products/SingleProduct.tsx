import { FaStar, FaRegStar } from "react-icons/fa";
import Rating from "react-rating";
import { useNavigate, useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../redux/features/product/productApi";
import { Modal, Spin } from "antd";
import { CustomError } from "../../types/baseQueryApi";
import { content } from "../../components/ui/Loading";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCart } from "../../redux/features/cart/cartSlice";
import { Fragment, useRef, useState } from "react";
import RelatedProducts from "../../components/page/SingleProduct/RelatedProducts";
import { useGetProductReviewQuery } from "../../redux/features/review/reviewApi";
import { useGetCartProductsQuery } from "../../redux/features/cart/cartApi";

export type TCartItem = {
  productId: string;
  qty: number;
};

const SingleProduct = () => {
  const { productId } = useParams();
  const { data, isLoading, isFetching, isError, error } =
    useGetSingleProductQuery(productId);
  const dispatch = useAppDispatch();
  const cartQtyRef = useRef<HTMLInputElement>(null);

  const [isWarningModalOpen, setIsWarningModalOpen] = useState(false);

  const showModal = () => {
    setIsWarningModalOpen(true);
  };

  const handleOk = () => {
    setIsWarningModalOpen(false);
    const newItem = {
      productId: productId as string,
      qty: Number(cartQtyRef?.current?.value),
    };
    localStorage.setItem("cartItems", JSON.stringify([newItem]));
    dispatch(setCart([newItem]));
    toast.success("The Item added to the cart", { position: "top-right" });
  };

  const handleCancel = () => {
    setIsWarningModalOpen(false);
    return;
  };

  const { cartItemIds } = useAppSelector((state) => state.cart);
  const { data: cartProducts } = useGetCartProductsQuery(cartItemIds);

  const addToCartHandler = () => {
    const newItem = {
      productId: productId as string,
      qty: Number(cartQtyRef?.current?.value),
    };
    const cartItems = localStorage.getItem("cartItems");
    if (!cartItems) {
      localStorage.setItem("cartItems", JSON.stringify([newItem]));
      dispatch(setCart([newItem]));
      toast.success("The Item added to the cart", { position: "top-right" });
    } else {
      // check if shop is different. if different replace or cancel
      const isProductVedorDifferent =
        cartProducts?.data[0]?.shopId !== data?.data?.shopId;
      if (isProductVedorDifferent) {
        showModal();
      } else {
        const parsedPreviousCartItems = JSON.parse(cartItems as string);
        const isItemAlreadyAdded = parsedPreviousCartItems.find(
          (item: TCartItem) => item.productId === productId
        );

        if (isItemAlreadyAdded) {
          toast("The Item is Already In Your Cart");
          return;
        } else {
          parsedPreviousCartItems.push(newItem);

          localStorage.setItem(
            "cartItems",
            JSON.stringify(parsedPreviousCartItems)
          );
          dispatch(setCart(parsedPreviousCartItems));
          toast.success("The Item added to the cart", {
            position: "top-right",
          });
        }
      }
    }
  };

  const totalRating = data?.data?.Reviews?.reduce((acc: number, val: any) => {
    return acc + val.rating;
  }, 0);

  const navigate = useNavigate();

  // reviews
  const { data: reviews } = useGetProductReviewQuery(productId);

  return (
    <>
      <Modal
        title="Basic Modal"
        open={isWarningModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Replace Current Item to the Cart"
        cancelText="Cancel Product to Add"
      >
        <p>You are attempting to add different shop product in your cart.</p>
      </Modal>
      <div
        style={isLoading || isFetching || isError ? {} : { display: "none" }}
        className="container mx-auto px-3 py-8"
      >
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
      </div>
      <div className="singleProduct container mx-auto px-3 pt-3 flex items-center gap-8">
        <div className="img_wrapper">
          <div className="big">
            <img
              className="w-[550px] h-[400px] object-contain"
              src={data?.data?.images[0]}
              alt=""
            />
          </div>
          <div className="flex">
            {data?.data?.images[1] && (
              <div className="flex-1">
                <img
                  className="w-full h-[100px] object-contain"
                  src={data?.data?.images[1]}
                  alt="product"
                />
              </div>
            )}
            {data?.data?.images[2] && (
              <div className="flex-1">
                <img
                  className="w-full h-[100px] object-contain"
                  src={data?.data?.images[2]}
                  alt="product"
                />
              </div>
            )}
            {data?.data?.images[3] && (
              <div className="flex-1">
                <img
                  className="w-full h-[100px] object-contain"
                  src={data?.data?.images[3]}
                  alt="product"
                />
              </div>
            )}
          </div>
        </div>
        <div className="text_wrapper flex flex-col gap-3">
          <h3 className="font-semibold uppercase">
            {data?.data?.name}{" "}
            <button className="px-2 text-[12px] rounded-sm bg-slate-700 text-white">
              {data?.data?.category?.name}
            </button>
          </h3>

          <p className="">{data?.data?.description}</p>
          <div className="rating">
            <div className="stars pt-[1px] pr-1 App">
              <Rating
                placeholderRating={totalRating / data?.data?.Reviews?.length}
                emptySymbol={<FaRegStar className="text-primary" />}
                placeholderSymbol={<FaStar className="text-primary" />}
                fullSymbol={<FaStar className="text-primary" />}
              />
            </div>
            <p>(Customer Reviews)</p>
          </div>
          <p className="text-accentColor font-semibold">
            Availability: {data?.data?.stock} in Stock
          </p>
          <p className="price font-bold text-lg">${data?.data?.price}</p>
          <div className="addToCart flex gap-4 items-center">
            <input
              min={1}
              ref={cartQtyRef}
              defaultValue={1}
              className="shadow p-2 w-16"
              type="number"
            />
            <button
              onClick={addToCartHandler}
              disabled={
                data?.data?.stock - Number(cartQtyRef.current?.value) < 0
              }
              className="bg-primary text-white rounded-sm px-6 py-2 hover:bg-txtColor"
            >
              ADD TO CART
            </button>
          </div>
          <div>
            <button
              onClick={() => navigate(`/products/shop/${data?.data?.shopId}`)}
              className="px-2 py-1 inline rounded-sm bg-accentColor text-white"
            >
              {data?.data?.shop?.name}
            </button>
          </div>
        </div>
      </div>

      {/* long description */}
      <div className="container mx-auto px-3 pb-4"
        dangerouslySetInnerHTML={{__html: data?.data?.long_description}} />

      {/* reviews */}
      <div className="reviews container mx-auto px-3 py-4">
        <h2 className="font-bold text-3xl mb-5">Reviews</h2>

        <div className="review mb-3">
          {reviews?.data?.length === 0 && (
            <p>No Review found for the product</p>
          )}
          {reviews?.data?.map((item: any) => (
            <Fragment key={item.id}>
              <div className="flex gap-4">
                <img
                  className="h-8 object-contain"
                  src="/user.png"
                  alt="avatar"
                />
                <div>
                  <h4 className="font-medium text-sm">{item.user.name}</h4>
                  <Rating
                    placeholderRating={item.rating}
                    emptySymbol={<FaRegStar className="text-primary" />}
                    placeholderSymbol={<FaStar className="text-primary" />}
                    fullSymbol={<FaStar className="text-primary" />}
                  />
                  <p>{item.description} </p>
                </div>
              </div>
              <hr className="my-3" />
            </Fragment>
          ))}
        </div>
      </div>

      {/* related products */}
      <RelatedProducts category={data?.data?.category?.name} />
    </>
  );
};

export default SingleProduct;
