import  { useEffect, useState } from 'react';
import { Carousel } from 'antd';


const Slider = () => {
    type TSliderItems = {
        image?: string;
    }
    const [sliderItems, setSliderItems] = useState<TSliderItems[]>([]);

  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  useEffect(() => {
    fetch('/json/slider.json')
    .then(res => res.json())
    .then(data => setSliderItems(data))
  }, [])
  return (
    // hero slider
    <Carousel autoplay autoplaySpeed={5000} afterChange={onChange} pauseOnHover={false}>
        {sliderItems?.map(item => (
            <div className='w-full max-h-[500px] overflow-hidden relative'>
                <img className='w-full h-full object-cover' src={`/sliderImgs/${item?.image}`} alt="slider thumbnail" />
                <div className="absolute w-full h-full left-0 top-0 flex flex-col justify-center items-center text-center text-white bg-black/50">
                  <h1 className='text-2xl font-bold'>Shop Your Desired Products!!!</h1>
                  <p className='text-base font-semibold'>Relax here, check with taking your enough time, select one, add that in cart and enjoy shopping</p>
                </div>
            </div>
        ))}
      
    </Carousel>
  );
};

export default Slider;