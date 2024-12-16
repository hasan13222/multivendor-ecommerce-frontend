import {  Spin } from "antd";
import { Fragment } from "react";
import { useGetProductsQuery } from "../../../redux/features/product/productApi";
import { content } from "../../ui/Loading";
import { CustomError } from "../../../types/baseQueryApi";
import { TProduct } from "../../../types/productType";
import Product from "../../ui/Product";

const RelatedProducts = ({ category }:{category:string}) => {
  const { data, isError, error, isLoading, isFetching }: Record<string, any> =
    useGetProductsQuery({
      limit: 8,
      category,
    });

  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <h2 className="font-bold text-3xl mb-5">Related Products</h2>

        {isLoading && isFetching && (
          <Spin tip="Loading" size="large">
            {content}
          </Spin>
        )}
        {isError && <p>{(error as CustomError)?.data?.message}</p>}
        <div className="featured_products grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
          {data?.data?.map((product: TProduct) => (
            <Fragment key={product.id}>
              <Product item={product} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default RelatedProducts;
