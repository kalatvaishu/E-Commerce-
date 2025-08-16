import React, { useEffect } from "react";
import Category from "../componets/Category";
import { useData } from "../Context/DataContaxt";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const { data, fetchAllProducts } = useData();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const PrevArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        zIndex: 3,
        left: "50px",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <FontAwesomeIcon
        icon={faArrowLeft}
        className="text-white bg-yellow-500 p-2 rounded-full text-xl cursor-pointer"
      />
    </div>
  );

  //next arrow
  const NextArrow = ({ onClick }) => (
    <div
      onClick={onClick}
      style={{
        zIndex: 3,
        right: "50px",
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      <FontAwesomeIcon
        icon={faArrowRight}
        className="text-white bg-yellow-500 p-2 rounded-full text-xl cursor-pointer"
      />
    </div>
  );

  //slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    pauseOnHover: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  return (
    <>
      <Slider {...settings}>
        {data?.slice(0, 7)?.map((item, index) => (
          <div
            key={index}
            className="bg-gradient-to-r from-[#0f0c29] via-[#302b63] to-[#24243e]"
          >
            <div className="flex flex-col md:flex-row items-center justify-center px-4 gap-10 h-[600px]">
              <div className="text-white md:space-y-6 space-y-3 max-w-xl">
                <h3 className="text-yellow-500 text-sm font-semibold">
                  Powering Your World with the Best in Electronics
                </h3>
                <h1 className="text-xl md:text-4xl font-bold uppercase line-clamp-2">
                  {item.title}
                </h1>
                <p className="text-gray-400 line-clamp-3">{item.description}</p>
                <button className="bg-gradient-to-r from-lime-400 to-purple-600 text-white px-4 py-2 rounded-lg">
                  Shop Now
                </button>
              </div>
              {/* Right section */}
              <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px] flex items-center justify-center">
                <div className="absolute w-full h-full bg-white rounded-full shadow-lg shadow-red-300 animate-spin"></div>
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-[250px] h-[250px] object-contain rounded-full z-10"
                ></img>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <Category />
    </>
  );
};

export default Carousel