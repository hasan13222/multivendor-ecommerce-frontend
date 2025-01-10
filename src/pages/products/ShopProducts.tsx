import Product from "../../components/ui/Product";
import { Spin } from "antd";
import { TProduct } from "../../types/productType";
import { content } from "../../components/ui/Loading";
import { CustomError } from "../../types/baseQueryApi";
import { Fragment, useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router-dom";
import {
  useGetShopProductsQuery,
} from "../../redux/features/product/productApi";
import {
  useCheckShopFollowQuery,
  useFollowShopMutation,
  useGetSingleShopQuery,
  useUnfollowShopMutation,
} from "../../redux/features/shop/shopApi";
import { toast } from "sonner";

const ShopProducts = () => {
  const [hasMore, setHasMore] = useState(true);
  const [postLimit, setPostLimit] = useState(8);

  const { shopId } = useParams();

  const { data, isError, error, isLoading, isFetching }: Record<string, any> =
    useGetShopProductsQuery({
      limit: postLimit,
      shopId,
    });

  const { data: shop } = useGetSingleShopQuery(shopId);
  const { data: isShopAlreadyFollowed } = useCheckShopFollowQuery(shopId);
  console.log(isShopAlreadyFollowed)

  const [followShop,] = useFollowShopMutation(undefined);
  const [unfollowShop,] = useUnfollowShopMutation(undefined);

  async function loadData() {
    if (data?.data?.length < postLimit) {
      setHasMore(false);
    } else {
      setPostLimit((prev) => prev + 4);
    }
  }

  async function shopFollowHandler() {
    let result;
    if (!isShopAlreadyFollowed.data) {
      result = await followShop(shopId);
      console.log(result)
      toast.success(result?.data?.message, {
        duration: 2000,
        position: "top-right",
      });
    } else {
      result = await unfollowShop(shopId);
      console.log(result)
      toast.success(result?.data?.message, {
        duration: 2000,
        position: "top-right",
      });
    }
     
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="products container mx-auto px-3 py-8">
        <div className="shop flex items-center gap-5">
          <img className="h-16 object-contain" src={shop?.data?.logo || "/store.png"} alt="store" />
          <div>
            <h4 className="font-medium text-sm">{shop?.data?.name}</h4>
            <p>{shop?.data?.description}</p>
            <span className="px-2 py-1 text-[12px] rounded-sm border-violet-600 border text-violet5-400">
              {shop?.data?.followedShop.length} following
            </span>
            <br />
            <button onClick={shopFollowHandler} className="px-4 py-1 rounded-sm bg-slate-700 text-white mt-2">
              {isShopAlreadyFollowed?.data ? "unfollow": "follow"}
            </button>
          </div>
        </div>
        <h2 className="font-bold text-3xl my-5">Products</h2>

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

export default ShopProducts;
