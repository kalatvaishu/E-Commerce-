import React, { useEffect, useState } from "react";
import Breadcrums from "../componets/Breadcrums";
import Loading from "../assets/Loading4.webm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../Context/CartContext";

const SinglePage = () => {
  const { id } = useParams(); // id format: fs-1 or ps-1
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (!id || !id.includes("-")) {
          console.error("Invalid product ID format.");
          return;
        }

        const [prefix, pid] = id.split("-");
        let response;

        if (prefix === "fs") {
          response = await axios.get(
            `https://fakestoreapi.com/products/${pid}`
          );
        } else if (prefix === "ps") {
          response = await axios.get(`https://dummyjson.com/products/${pid}`);
        } else {
          console.error("Unsupported product source.");
          return;
        }

        if (response?.data) {
          const prod = response.data;
          setProduct({
            id: id, // Keep formatted id like fs-1 or ps-1
            title: prod.title,
            description: prod.description,
            category: prod.category,
            price: prod.price,
            image: prod.image || (prod.images ? prod.images[0] : ""),
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <video autoPlay muted loop>
          <source src={Loading} type="video/mp4" />
        </video>
      </div>
    );
  }

  const originalPrice = Math.round(product.price * 1.2);

  return (
    <div className="px-4 pb-4 md:px-0">
      <Breadcrums title={product.title} />

      <div className="max-w-6xl mx-auto md:p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="w-full">
          <img
            src={product.image}
            alt={product.title}
            className="rounded-2xl w-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col gap-6">
          <h1 className="md:text-3xl text-xl font-bold text-gray-800">
            {product.title}
          </h1>

          <div className="text-gray-700">{product.category?.toUpperCase()}</div>

          <p className="text-xl text-yellow-500 font-bold">
            ${product.price}
            <span className="line-through text-gray-700 ml-3">
              ${originalPrice}
            </span>
          </p>

          <p className="text-gray-600">{product.description}</p>

          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-gray-700">
              Quantity:
            </label>
            <input
              type="number"
              min={1}
              value={1}
              readOnly
              className="w-20 border border-gray-300 rounded-lg px-3 py-1"
            />
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 flex items-center gap-2 px-6 py-2 text-lg bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition"
          >
            <FontAwesomeIcon icon={faCartShopping} className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default SinglePage;
