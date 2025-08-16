import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNewData } from "../Context/NewDataContaxt";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import notfound from "../assets/notfound.json";
import Loading from "../assets/Loading4.webm";
import Pagination from "../componets/Pagination";
import { useCart } from "../Context/CartContext";


const getUniqueCategories = (items, key) => {
  if (!items) return [];
  return ["All", ...new Set(items.map((item) => item[key]))];
};

const Product2 = () => {
  const { data, fetchAllProducts } = useNewData();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const categoryList = getUniqueCategories(data, "category");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setPage(1);
    // setOpenFilter(false);
  };

  const handleResetFilters = () => {
    setSearch("");
    setCategory("All");
    setPriceRange([0, 5000]);
    setPage(1);
  };

  // Filter data based on search, category, and price range (removed brand)
  const filteredData = data?.filter(
    (item) =>
      item.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === "All" || item.category === category) &&
      item.price >= priceRange[0] &&
      item.price <= priceRange[1]
  );

  const pageHandler = (selectedPage) => {
    setPage(selectedPage);
    window.scrollTo(0, 0); // scroll reset only here
  };

  // Total pages needed for pagination (8 items per page)
  const dynamicPage = Math.ceil(filteredData?.length / 8);

  return (
    <div className="max-w-7xl mx-auto px-4 mb-10">
      {/* Example: Loading Screen */}

      {/* Main Layout */}
      {data?.length > 0 ? (
        <div className="flex gap-6">
          {/* Sidebar Filter */}
          <div className="w-1/4 hidden md:block mt-4">
            <div className="bg-gray-50 rounded-lg p-4 shadow min-h-[400px]">
              <input
                type="text"
                placeholder="Search products..."
                className="border rounded px-3 py-2 w-full mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <label className="block mb-1 text-sm font-medium">Category</label>
              <div className="mb-4 space-y-1">
                {categoryList?.map((cat, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={category === cat}
                      onChange={handleCategoryChange}
                    />
                    <span className="uppercase">{cat}</span>
                  </label>
                ))}
              </div>

              <label>
                Price:${priceRange[0]} -${priceRange[1]}
              </label>
              <input
                type="range"
                min={0}
                max={5000}
                value={priceRange[1]}
                onChange={(e) =>
                  setPriceRange([priceRange[0], Number(e.target.value)])
                }
                className="w-full transition-all"
              />

              <button
                onClick={handleResetFilters}
                className="bg-yellow-500 text-white px-4 py-2 rounded w-full"
              >
                Reset Filters
              </button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="w-full md:w-3/4">
            {filteredData?.length > 0 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
                  {/* Example Product Card */}
                  {filteredData
                    .slice((page - 1) * 8, page * 8)
                    .map((product) => (
                      <div
                        key={product.id}
                        className="bg-white border border-gray-200 rounded-lg shadow p-3 flex flex-col justify-between transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer"
                        style={{ height: "320px" }}
                        onClick={() =>
                          navigate(`/products2/${product.id}`, {
                            state: { from: "product2" },
                          })
                        }
                      >
                        <div className="h-40 w-40 object-contain flex justify-center items-center">
                          <img
                            src={product.thumbnail}
                            alt={product.title}
                            className="object-contain h-full max-w-[80%]"
                          />
                        </div>
                        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mt-2 min-h-[36px]">
                          {product.title}
                        </h3>
                        <p className="text-base font-bold text-green-700 mt-1 mb-2">
                          ${product.price}
                        </p>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToCart(product);
                          }}
                          className="mt-auto bg-yellow-500 text-white py-1.5 text-sm rounded flex items-center justify-center gap-2"
                        >
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            className="w-4 h-4"
                          />
                          Add to Cart
                        </button>
                      </div>
                    ))}
                </div>

                {/* Static Pagination UI (Example) */}
                <div className="flex justify-center mt-6 space-x-2">
                  <Pagination
                    pageHandler={pageHandler}
                    page={page}
                    dynamicPage={dynamicPage}
                  />
                </div>
              </>
            ) : (
              <div className="flex justify-center items-center md:h-[600px] md:w-[900px] mt-10">
                <Lottie animationData={notfound} className="w-[500px]" />
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <video muted autoPlay loop>
            <source src={Loading} type="video/webm" />
          </video>
        </div>
      )}
    </div>
  );
};

export default Product2;
