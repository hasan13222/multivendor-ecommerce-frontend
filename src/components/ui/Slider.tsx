import { Carousel } from "antd";
import { useGetProductsQuery } from "../../redux/features/product/productApi";
import { TProduct } from "../../types/productType";
import { useNavigate } from "react-router-dom";

const Slider = () => {
  

  const { data } = useGetProductsQuery({
    limit: 3,
  });

  const navigate = useNavigate();

  
  return (
    // hero slider
    <Carousel
      autoplay
      autoplaySpeed={5000}
      pauseOnHover={false}
    >
      {data?.data?.map((item: TProduct) => (
        <div className="w-full max-h-[500px] overflow-hidden relative">
          <img
            className="w-full h-full object-cover"
            src={item?.images[0]}
            alt={item?.name}
          />
          <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center text-center text-white bg-black/50">
            <h1 className="text-2xl font-bold capitalize">
            {item?.name} at ${item?.price}
              
            </h1>
            <p className="text-base mb-2 font-semibold">
            Shop Your Desired Product Here at Affordable Price!!!
            </p>
            <button onClick={() => navigate(`/products/${item.id}`)} className="bg-accentColor px-2 rounded-md py-1 text-white">Order Now</button>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
