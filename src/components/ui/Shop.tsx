import { useNavigate } from "react-router-dom";

const Shop = ({item}:any) => {
    const navigate = useNavigate();

  return (
    <div className="shop flex items-center gap-5 border-b pb-5">
      <img
      onClick={() => navigate(`/products/shop/${item?.id}`)}
        className="h-16 object-contain cursor-pointer"
        src={item?.logo || "/store.png"}
        alt="store"
      />
      <div>
        <h4 onClick={() => navigate(`/products/shop/${item?.id}`)} className="font-semibold text-base cursor-pointer">{item?.name}</h4>
        <p>{item?.description}</p>
        <span className="px-2 py-1 text-[12px] rounded-sm border-violet-600 border text-violet5-400">
          {item?.followedShop?.length} following
        </span>
      </div>
    </div>
  );
};

export default Shop;
