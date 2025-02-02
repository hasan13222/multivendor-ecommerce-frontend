import { Layout, Spin } from "antd";
import { FaAngleUp, FaBars } from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Product from "../../components/ui/Product";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.compat.css"
// import { categories } from "../../constants/categories";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  setCategory,
  // setSort,
} from "../../redux/features/product/productQuerySlice";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";
// import { Fragment, SyntheticEvent, useEffect, useRef, useState } from "react";
// import InfiniteScroll from "react-infinite-scroll-component";
// import { setFilterModalOpen } from "../../redux/features/product/productSlice";
// import { CiFilter } from "react-icons/ci";
// import FilterForm from "../../components/form/FilterForm";
// import { RiArrowUpDownLine } from "react-icons/ri";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";
import Slider from "../../components/ui/Slider";
import ChooseUsItem from "../../components/ui/ChooseUsItem";
import "../../styles/discount.css";
import { useCreateNewsletterMutation } from "../../redux/features/newsletter/newsletterApi";
import { toast } from "sonner";

const { Header } = Layout;
const Home = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { data: categories } = useGetCategoriesQuery(undefined);
  // const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({
  //   limit: postLimit,
  // });

  // search filter funcionality
  const { searchTerm, category, minPrice, maxPrice } = useAppSelector(
    (state) => state.productQuery
  );
  // const { filterModalOpen } = useAppSelector((state) => state.product);

  const { data, isError, error, isLoading, isFetching }: Record<string, any> =
    useGetProductsQuery({
      searchTerm,
      limit: 4,
      category,
      minPrice,
      maxPrice,
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
      <Slider />
      <Header
        className="bg-primary text-white"
        style={{
          display: "flex",
          alignItems: "center",
          boxShadow: "0 2px 3px 1px #e2e3e2",
        }}
      >
        <div className="mobile_categories block lg:hidden relative">
          <button
            className="flex items-center gap-1"
            onClick={() => setShowCategories(!showCategories)}
          >
            <FaBars />
            <span>Categories</span>
          </button>
          <ul
            className={`${
              showCategories ? "block" : "hidden"
            } absolute top-14 rounded-md bg-black w-[250px] z-10`}
          >
            {categories?.data?.map((category: { name: string }, i: number) => (
              <li
                className="cursor-pointer hover:bg-white hover:text-black pl-4"
                onClick={() => categoryHandler(category.name)}
                key={`category${i}`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="categories hidden lg:flex">
          {categories?.data?.map((category: { name: string }, i: number) => (
            <div
              key={i}
              className="item hover:bg-white hover:text-primary cursor-pointer"
            >
              <button onClick={() => categoryHandler(category.name)}>
                {category.name}
              </button>
            </div>
          ))}
        </div>
      </Header>
      {/* search filter row */}
      {/* 
      <div className="container mx-auto">
        <div className="search_filter flex flex-wrap items-center gap-4 my-4">
          <button
            onClick={showFilterModal}
            className="btn btn-accent text-white"
          >
            <CiFilter className="text-lg text-white" /> <span>Filter</span>
          </button>

          <Modal
            title="Product Filter"
            open={filterModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <FilterForm />
          </Modal>
          <form ref={searchFormRef} onSubmit={handleSearch}>
            <input
              name="searchText"
              type="text"
              className="input input-bordered"
              placeholder="type product name here..."
            />
            <button type="submit" className="btn btn-success text-white ml-1">
              Search
            </button>
          </form>
          <button
            onClick={handleClearFilter}
            className="btn btn-secondary text-white"
          >
            Clear Search & Filter
          </button>
         
        </div>
      </div>
      */}

      {/* all products */}
      <div className="featured_section container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Recommended For You</h2>
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <ScrollAnimation animateIn="fadeIn">
          <div className="featured_products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
            {data?.data?.map((product: TProduct) => (
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
          <div className="bg-black/90 py-24 rounded-md">
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

      {/* why choose us */}
      <ScrollAnimation animateIn="fadeIn">
        <div className="container my-8 mx-auto">
          <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">
            Why Choose EcoHub
          </h2>
          <div className="chooseUs flex items-end mt-1">
            <ul className="chooseUs__items pl-8">
              <ChooseUsItem />
            </ul>
            <div className="img_wrapper -ml-5">
              <img
                className="max-h-[320px] object-contain"
                src="/customer.png"
                alt="smiling customer"
              />
            </div>
          </div>
        </div>
      </ScrollAnimation>

      {/* newsletter section */}
      <div className="container my-8 mx-auto text-center text-white/90">
        <div className="discount newsletter rounded-md">
          <div className="bg-primary/50 py-24 rounded-md">
            <h2 className="scroll-m-20 text-bgclr text-3xl italic font-semibold tracking-tight mb-5">
              Subscribe to our Newsletter
            </h2>
            <form
              onSubmit={newsletterHandler}
              className="flex gap-4 items-center justify-center"
            >
              <input
                className="form-input p-4 rounded-md"
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
