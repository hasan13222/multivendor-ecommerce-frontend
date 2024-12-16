import { Layout, Modal, Spin } from "antd";
import { FaAngleUp, FaBars } from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import Product from "../../components/ui/Product";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
// import { categories } from "../../constants/categories";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearFilter,
  setCategory,
  setSearchTerm,
  // setSort,
} from "../../redux/features/product/productQuerySlice";
import { useNavigate } from "react-router-dom";
import { Fragment, SyntheticEvent, useEffect, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { setFilterModalOpen } from "../../redux/features/product/productSlice";
import { CiFilter } from "react-icons/ci";
import FilterForm from "../../components/form/FilterForm";
// import { RiArrowUpDownLine } from "react-icons/ri";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";

const { Header } = Layout;
const Home = () => {
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hasMore, setHasMore] = useState(true);
  const [postLimit, setPostLimit] = useState(8);

  const { data: categories } = useGetCategoriesQuery(undefined);
  // const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({
  //   limit: postLimit,
  // });

  // search filter funcionality
  const { searchTerm, category, minPrice, maxPrice } = useAppSelector(
    (state) => state.productQuery
  );
  const { filterModalOpen } = useAppSelector((state) => state.product);

  const { data, isError, error, isLoading, isFetching }: Record<string, any> =
    useGetProductsQuery({
      searchTerm,
      limit: postLimit,
      category,
      minPrice,
      maxPrice,
    });

  const searchFormRef = useRef<HTMLFormElement>(null);
  // const onPageChange = (page: number) => {
  //   dispatch(setPage(page));
  // };

  const handleSearch = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchText = e.currentTarget.searchText.value;

    dispatch(setSearchTerm(searchText));
  };

  const handleCancel = () => {
    dispatch(setFilterModalOpen(false));
  };

  const showFilterModal = () => {
    dispatch(setFilterModalOpen(true));
  };

  const handleClearFilter = () => {
    dispatch(setSearchTerm(""));
    dispatch(clearFilter());
    searchFormRef.current?.reset();
  };

  // const sortHandler = () => {
  //   if (sort === "price") {
  //     dispatch(setSort("-price"));
  //   } else {
  //     dispatch(setSort("price"));
  //   }
  // };

  async function loadData() {
    if (data?.data?.length < postLimit) {
      setHasMore(false);
    } else {
      setPostLimit((prev) => prev + 4);
    }
  }

  const categoryHandler = (category: string) => {
    dispatch(setCategory(category));
    navigate("/products");
  };
  useEffect(() => {
    loadData();
  }, []);
  return (
    <>
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
          {/* <div className="justify-self-end">
            <button onClick={sortHandler} className="btn btn-accent text-white">
              Sort <RiArrowUpDownLine />
            </button>
          </div> */}
        </div>
      </div>

      {/* all products */}
      <div className="featured_section container mx-auto px-3 py-8">
        {/* <h2 className="font-bold text-3xl mb-5">Featured Products</h2> */}
        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <InfiniteScroll
          dataLength={postLimit}
          next={loadData}
          hasMore={hasMore}
          loader={<p>Loading...</p>}
          endMessage={<p>No more data to load.</p>}
        >
          <div className="featured_products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
            {data?.data?.map((product: TProduct) => (
              <Fragment key={product.id}>
                <Product item={product} />
              </Fragment>
            ))}
          </div>
        </InfiniteScroll>
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
