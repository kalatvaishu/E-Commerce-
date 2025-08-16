import React from "react";
import { useData } from "../Context/DataContaxt";

const FilterSection = ({
  search,
  setSearch,
  priceRange,
  setPriceRange,
  category,
  setCategory,
  handleCategoryChange,
}) => {
  const { categoryList = [] } = useData() || {};
  return (
    <>
      <div className="bg-gray-100 mt-10 p-4 rounded-lg h-max hidden md:block w-[500px]">
        {/* search box */}
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-white p-2 rounded-md border-2 border-gray-400 w-full"
          placeholder="Search Products..."
        />

        {/* category filter */}
        <h2 className="mt-5 font-semibold text-xl">Category</h2>
        <div className="flex flex-col gap-2 mt-3">
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

        {/* Price range filter */}
        <h2 className="mt-5 font-semibold text-xl">Price Range</h2>
        <div className="flex flex-col gap-2 ">
          <label>
            Price:${priceRange[0]} -${priceRange[1]}
          </label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value)])
            }
            className="w-full transition-all"
          />
        </div>

        {/* Reset button */}
        <button
          onClick={() => {
            setSearch("");
            setCategory("All");
            setPriceRange([0, 1000]);
          }}
          className="bg-yellow-500 text-white rounded-md px-3 py-1 mt-5 w-full"
        >
          Reset Fillter
        </button>
      </div>
    </>
  );
};

export default FilterSection;
