import { FaStar, FaRegStar } from "react-icons/fa";
import { TProduct } from "../../types/productType";
import Rating from "react-rating";
import { useNavigate } from "react-router-dom";

const Product = ({ item }: { item: TProduct }) => {
  const navigate = useNavigate();

  const totalRating = item.Reviews.reduce((acc, val:any)=> {
    return acc + val.rating
  }, 0);
  return (
    <>
    {/* product card */}
      <div style={{transition: "bottom 0.3s ease-in-out"}} className="card w-full shadow-xl relative bottom-0 hover:bottom-2">
        <figure className="px-5 pt-5">
          <img
            src={item?.images[0]}
            alt={item?.name}
            className="rounded-xl w-[250px] h-[150px] object-cover"
          />
        </figure>
        <div className="card-body p-5 pt-4">
          <div className="">
            <h2 className="card-title text-base font-bold leading-4 mb-2">
              {item?.name}
            </h2>
            <button className="px-2 py-1 rounded-sm bg-slate-700 text-white">
              {item?.category?.name}
            </button>
          </div>

          <p>{item?.description}</p>
          <p>
            <span className="font-semibold">Code:</span> {item?.code}
          </p>
          <div className="rating_price flex justify-between items-center">
            <div className="rating">
            <Rating
                placeholderRating={totalRating/item.Reviews.length}
                emptySymbol={<FaRegStar className="text-primary" />}
                placeholderSymbol={<FaStar className="text-primary" />}
                fullSymbol={<FaStar className="text-primary" />}
                readonly={true}
              />
            </div>
            <div className="price">
              <p className="font-bold">${item?.price}</p>
            </div>
          </div>
          <div className="card-actions flex justify-between items-center">
            <span className="text-sm font-semibold text-accentColor">
              In Stock: {item?.stock}
            </span>
            <button onClick={() => navigate(`/products/${item.id}`)} className="btn bg-primary text-white">View Details</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
