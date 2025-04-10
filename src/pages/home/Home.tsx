import {  Spin } from "antd";
import { FaAngleUp,  } from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Product from "../../components/ui/Product";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css";
import { useAppDispatch } from "../../redux/hooks";
import {
  setCategory,
  // setSort,
} from "../../redux/features/product/productQuerySlice";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import Slider from "../../components/ui/Slider";
import "../../styles/discount.css";
import { useCreateNewsletterMutation } from "../../redux/features/newsletter/newsletterApi";
import { toast } from "sonner";
import SliderRightProduct from "../../components/page/Home/SliderRight";
import { BsBox } from "react-icons/bs";
import { GrDeliver } from "react-icons/gr";
import { GoCreditCard } from "react-icons/go";
import { TfiHeadphoneAlt } from "react-icons/tfi";

const Home = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: categories } = useGetCategoriesQuery(undefined);

  const { data, isError, error, isLoading, isFetching }: Record<string, any> =
    useGetProductsQuery({
      limit: 12,
    });

  const [addNewsletter] = useCreateNewsletterMutation(undefined);

  const categoryHandler = (category: string) => {
    dispatch(setCategory(category));
    navigate("/products");
  };

  async function newsletterHandler(e: any) {
    e.preventDefault();
    const addedNewsletter = await addNewsletter({
      email: e.target.email.value,
    });
    if (addedNewsletter.data) {
      toast("You have successfully subscribed to the newsletter");
      e.target.reset();
    }
  }

  return (
    <>
      

      {/* slider */}
      <div className="slider_section featured_section container mx-auto px-3 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="col-span-1">
            <Slider />
          </div>
          <div className="col-span-1 flex flex-col justify-center gap-3">
            <SliderRightProduct item={data?.data[2]} />
            <SliderRightProduct item={data?.data[1]} />
          </div>
        </div>
      </div>

      {/* why choose us */}
        <div className="container my-8 mx-auto">
          <div className="chooseUs grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-between mt-1 border rounded-md p-5">
            <div className="item flex items-center gap-3">
              <GrDeliver size={25} />
              <div className="text">
                <h3 className="font-semibold text-base">Fastest Delivery</h3>
                <p>Delivery in 24/3</p>
              </div>
            </div>
            <div className="item flex items-center gap-3">
              <BsBox size={25} />
              <div className="text">
                <h3 className="font-semibold text-base">24 Hours Return</h3>
                <p>100% money back guarantee</p>
              </div>
            </div>
            <div className="item flex items-center gap-3">
              <GoCreditCard size={25} />
              <div className="text">
                <h3 className="font-semibold text-base">Secure Payment</h3>
                <p>Your money is safe</p>
              </div>
            </div>
            <div className="item flex items-center gap-3">
              <TfiHeadphoneAlt size={25} />
              <div className="text">
                <h3 className="font-semibold text-base">
                  24/7 Customer Support
                </h3>
                <p>Live Contact</p>
              </div>
            </div>
          </div>
        </div>

      {/* recommended products */}
      <div className="featured_section container mx-auto px-3 py-5">
        <h2 className="font-bold text-2xl mb-5">Recommended For You</h2>
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <ScrollAnimation animateIn="fadeIn">
          <div className="featured_products grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7">
            {data?.data?.slice(0, 4).map((product: TProduct) => (
              <Fragment key={product.id}>
                <Product item={product} />
              </Fragment>
            ))}
          </div>
        </ScrollAnimation>
      </div>

      {/* recommended products */}
      <div className="featured_section container mx-auto px-3 py-8">
        <h2 className="font-bold text-2xl mb-5">Top Picks for you</h2>
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <ScrollAnimation animateIn="fadeIn">
          <div className="featured_products grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7">
            {data?.data?.slice(4, 8).map((product: TProduct) => (
              <Fragment key={product.id}>
                <Product item={product} />
              </Fragment>
            ))}
          </div>
        </ScrollAnimation>
      </div>

      {/* promotion section */}
      <div className="container my-8 mx-auto text-center text-white">
        <div className="discount rounded-md">
          <div className="bg-black/50 py-24 rounded-md">
            <h2 className="scroll-m-20 text-bgclr text-5xl italic font-semibold tracking-tight mb-5">
              Huge Discount !!!
            </h2>
            <p className="text-2xl text-bgclr mb-3">
              Use Coupon code B71 to get upto $71 discount on your product
              purchase.
            </p>
          </div>
        </div>
      </div>

      {/* categories */}
      <div className="categories_section container mx-auto px-3 py-8">
        <h2 className="font-bold text-2xl mb-5">We Proudly Sell</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 justify-around gap-3 border rounded-md">
          {categories?.data?.map((category: { name: string }, i: number) => (
            <div key={i} className="item p-5 flex flex-col gap-3 items-center">
              <img
                className="w-16 h-16 object-cover"
                src={`/category/${category.name.toLowerCase()}.png`}
                alt="category"
              />
              <button
                className="hover:bg-white hover:text-primary cursor-pointer font-semibold px-1"
                onClick={() => categoryHandler(category.name)}
              >
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* featured products */}
      <div className="featured_section container mx-auto px-3 py-8">
        <h2 className="font-bold text-2xl mb-5">Featured Products</h2>
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <ScrollAnimation animateIn="fadeIn">
          <div className="featured_products grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7">
            {data?.data?.slice(8, 12).map((product: TProduct) => (
              <Fragment key={product.id}>
                <Product item={product} />
              </Fragment>
            ))}
          </div>
        </ScrollAnimation>
      </div>

      {/* newsletter section */}
      <div className="container my-8 mx-auto text-center text-white/90">
        <div className="discount newsletter rounded-md">
          <div className="bg-black/80 py-24 rounded-md">
            <h2 className="scroll-m-20 text-bgclr text-3xl italic font-semibold tracking-tight mb-5">
              Subscribe to our Newsletter
            </h2>
            <form
              onSubmit={newsletterHandler}
              className="flex flex-wrap gap-4 items-center justify-center"
            >
              <input
                className="form-input p-4 rounded-md text-black"
                type="email"
                name="email"
                placeholder="Put Your Email Here"
              />
              <input
                className="btn bg-secondary"
                type="submit"
                value="Subscribe"
              />
            </form>
          </div>
        </div>
      </div>

      <button
        onClick={() =>
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
          })
        }
        className="fixed z-50 bottom-5 right-5 flex flex-col items-center py-1 rounded-sm px-3 bg-rose-400 text-white"
      >
        <span>
          <FaAngleUp />
        </span>
        <span>Top</span>
      </button>
    </>
  );
};

export default Home;
