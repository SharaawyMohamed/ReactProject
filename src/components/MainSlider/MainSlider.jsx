import React from 'react'
import SlickSlider from 'react-slick'
import slide1 from '../../assets/images/slider-2.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import grocery1 from '../../assets/images/grocery-banner.png'
import grocery2 from '../../assets/images/grocery-banner-2.jpeg'

const Slider = SlickSlider.default ?? SlickSlider;

export default function MainSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1, // Changed to 1 for a hero slider effect
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className='w-full container mx-auto py-10 px-4 pt-15 '>
      <div className='grid grid-cols-1 md:grid-cols-7'>

        <div className='md:col-span-5'>
          <Slider {...settings}>
            <img src={slide1} alt='slide1' className='w-full h-[300px] object-cover' />
            <img src={slide2} alt='slide2' className='w-full h-[300px] object-cover' />
            <img src={slide3} alt='slide3' className='w-full h-[300px] object-cover' />
          </Slider>
        </div>

        <div className='md:col-span-2 flex flex-col'>
          <img src={grocery1} alt='banner1' className='w-full h-[150px] object-cover' />
          <img src={grocery2} alt='banner2' className='w-full h-[150px] object-cover' />
        </div>

      </div>
    </div>
  )
}