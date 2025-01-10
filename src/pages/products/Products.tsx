import Product from "../../components/ui/Product";
import { CiFilter } from "react-icons/ci";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { Modal, Pagination, Spin } from "antd";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import {
  clearFilter,
  setPage,
  setSearchTerm,
} from "../../redux/features/product/productQuerySlice";
import { Fragment, SyntheticEvent, useRef } from "react";
import { setFilterModalOpen } from "../../redux/features/product/productSlice";
import FilterForm from "../../components/form/FilterForm";
import { FaAngleUp } from "react-icons/fa";

const Products = () => {
  const dispatch = useAppDispatch();

  // const { data, isLoading, isFetching, isError, error } = useGetProductsQuery({
  //   limit: postLimit,
  // });

  // search filter funcionality
  const { searchTerm, category, minPrice, maxPrice, page } = useAppSelector(
    (state) => state.productQuery
  );
  const { filterModalOpen } = useAppSelector((state) => state.product);

  const { data, isError, error, isLoading, isFetching } = useGetProductsQuery({
    searchTerm,
    limit: 6,
    category,
    minPrice,
    maxPrice,
    page: page,
  });

  console.log(data);

  const searchFormRef = useRef<HTMLFormElement>(null);

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

  const onPageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <div className="flex gap-4">
          <div className="hidden md:block min-w-[220px] max-w-[250px] overflow-hidden">
            <div className="search_filter flex flex-col flex-wrap gap-4 mb-4">
            <button
                onClick={handleClearFilter}
                className="btn btn-secondary text-white"
              >
                Clear Search & Filter
              </button>
              <form ref={searchFormRef} onSubmit={handleSearch}>
                <input
                  name="searchText"
                  type="text"
                  className="input input-bordered"
                  placeholder="Type product name here..."
                />
                <button
                  type="submit"
                  className="btn btn-success text-white mt-2 w-full"
                >
                  Search
                </button>
              </form>
              <div>
                <FilterForm />
              </div>
              
              
            </div>
          </div>
          <div className="products_wrapper">
            <h2 className="font-bold text-3xl mb-5">Our Products</h2>
            {/* search filter row */}
            <div className="search_filter flex md:hidden flex-wrap items-center gap-4 mb-4">
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
                <button
                  type="submit"
                  className="btn btn-success text-white ml-1"
                >
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

            {isLoading && isFetching && (
              <Spin tip="Loading" size="large">
                {content}
              </Spin>
            )}
            {isError && <p>{(error as CustomError)?.data?.message}</p>}

            <div className="featured_products grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
              {data?.data?.map((product: TProduct) => (
                <Fragment key={product.id}>
                  <Product item={product} />
                </Fragment>
              ))}
            </div>

            {/* pagination */}
            {data?.data?.length > 0 ? <div className="flex justify-end mt-7">
              <Pagination
                onChange={onPageChange}
                defaultCurrent={data?.meta?.page}
                total={data?.meta?.total}
                pageSize={data?.meta?.limit}
              />
            </div> : <h3>No Product Found</h3>}
            
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

export default Products;
