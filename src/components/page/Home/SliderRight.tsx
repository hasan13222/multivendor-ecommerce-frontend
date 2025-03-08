import { useNavigate } from "react-router-dom";
import { TProduct } from "../../../types/productType";

const SliderRightProduct = ({ item }: { item: TProduct }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{ transition: "bottom 0.3s ease-in-out" }}
      className="card w-full shadow-xl relative bottom-0 hover:bottom-2"
    >
      <div className="flex gap-2 p-5 items-center">
        <figure className="">
          <img
            src={item?.images[0]}
            alt={item?.name}
            className="rounded-xl w-[200px] h-[120px] object-cover"
          />
        </figure>
        <div className="card-body p-0">
          <div className="">
            <h2 className="card-title text-base font-bold leading-4">
              {item?.name} is available now
            </h2>
          </div>

          <p>{item?.description}</p>

          <div className="card-actions flex justify-between items-center">
            <button
              onClick={() => navigate(`/products`)}
              className="btn btn-sm bg-accentColor text-white"
            >
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SliderRightProduct;
