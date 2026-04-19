import React from "react";
import SlickSlider from "react-slick";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Slider = SlickSlider.default ?? SlickSlider;

export default function HomeSlider() {
  const [categories, setCategories] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  async function getCategories() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setIsLoading(false);
    }
  }

  React.useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: true,
  };

  if (isLoading) {
    return <div className="w-full h-[300px] bg-gray-200 animate-pulse rounded-lg mt-10"></div>;
  }

  return (
    <div className="container mx-auto px-4">
      <div className="category-slider">
        <Slider {...settings}>
          {categories.map((cat) => (
            <div key={cat._id} className="outline-none">
              <Link
                to={`/category/${cat._id}`}
                className="block relative group overflow-hidden aspect-square"
              >
                {/* aspect-square forces the height to match the width automatically */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Simple Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80 transition-opacity"></div>

                {/* Category Name */}
                <div className="absolute bottom-4 inset-x-0 text-center px-2">
                  <h3 className="text-white text-sm font-bold uppercase tracking-widest">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}