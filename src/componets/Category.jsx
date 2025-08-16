import React, { useEffect } from "react";
import { useData } from "../Context/DataContaxt";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const { data = [], fetchAllProducts } = useData() || {};

  useEffect(() => {
    if (!data || data.length === 0) {
      fetchAllProducts();
    }
  }, [data, fetchAllProducts]);

  const getUniqueCategories = (items, key) => {
    if (!items) return [];
    return [...new Set(items.map((item) => item[key]))];
  };

  const categories = getUniqueCategories(data, "category");

  if (!data || data.length === 0) {
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-white text-lg"> Loading Category...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#101829]">
      <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-around py-7 px-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => navigate(`/category/${category}`)}
            className="uppercase bg-gradient-to-r from-lime-500 to-purple-500 text-white px-3 py-1 rounded-md cursor-pointer"
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Category;
