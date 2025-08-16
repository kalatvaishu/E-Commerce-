
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCartShopping} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../Context/CartContext';

function ProductCard({product}) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  return (
    <>
      <div
        className="border border-gray-300 rounded-lg p-3 shadow-sm hover:scale-105 hover:shadow-lg duration-300 flex flex-col justify-between cursor-pointer"
        style={{ height: "100%" }}
      >
        <div
          className="flex justify-center items-center mb-2"
          onClick={() => navigate(`/product/${product.id}`)}
        >
          <img
            src={product.image}
            alt="product.title"
            className="h-40 w-40 object-contain"
          />
        </div>

        <h2 className="text-sm font-medium text-gray-800 line-clamp-2 h-10">
          {product.title}
        </h2>
        <p className="text-lg font-bold text-black mb--3">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-yellow-500 hover:bg-red-400 text-sm  font-semibold text-white py-2 px-2 rounded w-full flex items-center justify-center gap-2"
        >
          <FontAwesomeIcon icon={faCartShopping} className="w-4 h-4" />
          Add to Card
        </button>
      </div>
    </>
  );
}

export default ProductCard