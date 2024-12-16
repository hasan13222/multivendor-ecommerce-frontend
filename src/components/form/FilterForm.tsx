import { SubmitHandler, useForm } from "react-hook-form";
// import { categories } from "../../constants/categories";
import { useAppDispatch } from "../../redux/hooks";
import { setFilterValues } from "../../redux/features/product/productQuerySlice";
import { setFilterModalOpen } from "../../redux/features/product/productSlice";
import { useGetCategoriesQuery } from "../../redux/features/category/categoryApi";

const FilterForm = () => {
  // react hook form options
  const { register, handleSubmit } = useForm<TFilterItem>();

  // get categories
  const {data:categories} = useGetCategoriesQuery(undefined);
  console.log(categories)
  // redux dispatch
  const dispatch = useAppDispatch();

  // filter options type
  interface TFilterItem {
    category: string;
    brand: string;
    minPrice: number;
    maxPrice: number;
    minRating: number;
  }

  // filter handler
  const onSubmit: SubmitHandler<TFilterItem> = async (data) => {
    const maxPrice = Number(data.maxPrice) ? Number(data.maxPrice) : 100000000;

    // update filter options state to trigger get product query with filter
    dispatch(setFilterValues({
      category: data.category,
      brand: data.brand,
      minPrice: Number(data.minPrice),
      maxPrice,
      minRating: Number(data.minRating)
    }));

    // close filter modal
    dispatch(setFilterModalOpen(false))
  };
  return (
    <>
    {/* filter form */}
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="flex flex-col">
          <label>Category</label>
          <select
            className="py-2 border rounded-md px-2"
            {...register("category", { required: false })}
          >
            {categories?.data?.map((category: {name: string}, i: number) => (
              <option value={category.name} key={i}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label>Minimum Price</label>
          <input
            type="number"
            className="py-2 border rounded-md px-2"
            {...register("minPrice", { required: false })}
          />
        </div>
        <div className="flex flex-col">
          <label>Maximum Price</label>
          <input
            type="number"
            className="py-2 border rounded-md px-2"
            {...register("maxPrice", { required: false })}
          />
        </div>
        

        <input
          className="btn bg-primary text-white"
          type="submit"
          value="Filter"
        />
      </form>
    </>
  );
};

export default FilterForm;
