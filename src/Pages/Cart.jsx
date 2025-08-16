import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashAlt,
  faFileInvoice,
  faTruck,
  faShoppingBag,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../Context/CartContext";
import emptyCart from "../assets/empty-cart.png";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Cart = ({ loaction, getLocation }) => {

  const { cartItem, updateQuantity, deleteItem } = useCart();
  const navigate = useNavigate();
  const { user } = useUser();

  const totalPrice = cartItem.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5 px-4 md:px-0">
      {/* Example with cart items present */}
      {cartItem.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart ({cartItem.length})</h1>

          <div className="mt-10">
            {cartItem.map((item, index) => (
              <div
                key={index}
                className="bg-gray-100 p-5 rounded-md flex items-center justify-between mt-3 w-full"
              >
                <div className="flex items-center gap-4">
                  {item?.images && Array.isArray(item.images) && (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  )}
                  {item?.image && (
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-md object-cover"
                    />
                  )}
                  <div>
                    <h1 className="md:w-[300px] line-clamp-2">{item.title}</h1>
                    <p className="text-yellow-500 font-semibold text-lg">
                      ${item.price}
                    </p>
                  </div>
                </div>
                <div className="bg-yellow-500 text-white flex gap-4 p-2 rounded-md font-bold text-xl">
                  <button
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "decrease")
                    }
                    className="cursor-pointer"
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(cartItem, item.id, "increase")
                    }
                    className="cursor-pointer"
                  >
                    +
                  </button>
                </div>
                <span
                  onClick={() => deleteItem(item.id)}
                  className="hover:bg-white/60 transition-all rounded-full p-3 hover:shadow-2xl"
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    className="text-yellow-500 text-2xl cursor-pointer"
                  />
                </span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 md:gap-20">
            {/* Delivery Info */}
            <div className="bg-gray-100 rounded-md p-7 mt-4 space-y-2">
              <h1 className="text-gray-800 font-bold text-xl">Delivery Info</h1>
              <div className="flex flex-col space-y-1">
                <label>Full Name</label>
                <input
                  type="text"
                  className="p-2 rounded-md"
                  defaultValue={user?.fullName}
                />
              </div>
              <div className="flex flex-col space-y-1">
                <label>Address</label>
                <input
                  type="text"
                  className="p-2 rounded-md"
                  defaultValue={loaction?.country}
                />
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>State</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    defaultValue={loaction?.state}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>PostCode</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    defaultValue={loaction?.postcode}
                  />
                </div>
              </div>
              <div className="flex w-full gap-5">
                <div className="flex flex-col space-y-1 w-full">
                  <label>Country</label>
                  <input
                    type="text"
                    className="p-2 rounded-md w-full"
                    defaultValue={loaction?.country}
                  />
                </div>
                <div className="flex flex-col space-y-1 w-full">
                  <label>Phone No</label>
                  <input type="text" className="p-2 rounded-md w-full" />
                </div>
              </div>
              <button className="bg-yellow-500 text-white px-3 py-1 rounded-md mt-3 cursor-pointer">
                Submit
              </button>
              <div className="flex items-center justify-center w-full text-gray-700">
                ---------OR-----------
              </div>
              <div className="flex justify-center">
                <button
                  onClick={getLocation}
                  className="bg-yellow-500 text-white px-3 py-2 rounded-md"
                >
                  Detect Location
                </button>
              </div>
            </div>

            {/* Billing Section */}
            <div className="bg-white border border-gray-100 shadow-xl rounded-md p-7 mt-4 space-y-2 h-max">
              <h1 className="text-gray-800 font-bold text-xl">Bill details</h1>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <FontAwesomeIcon icon={faFileInvoice} />
                  Items total
                </h1>
                <p>${totalPrice.toFixed(2)}</p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <FontAwesomeIcon icon={faTruck} />
                  Delivery Charge
                </h1>
                <p className="text-yellow-500 font-semibold">
                  <span className="text-gray-600 line-through">$25</span> FREE
                </p>
              </div>

              <div className="flex justify-between items-center">
                <h1 className="flex gap-1 items-center text-gray-700">
                  <FontAwesomeIcon icon={faShoppingBag} />
                  Handling Charge
                </h1>
                <p className="text-yellow-500 font-semibold">$5</p>
              </div>

              <hr className="text-gray-200 mt-2" />

              <div className="flex justify-between items-center">
                <h1 className="font-semibold text-lg">Grand total</h1>
                <p className="font-semibold text-lg">
                  ${(totalPrice + 5).toFixed(2)}
                </p>
              </div>

              <div>
                <h1 className="font-semibold text-gray-700 mb-3 mt-7">
                  Apply Promo Code
                </h1>
                <div className="flex gap-3">
                  <input type="text" className="p-2 rounded-md w-full" />
                  <button className="bg-white text-black border border-gray-200 px-4 cursor-pointer py-1 rounded-md">
                    Apply
                  </button>
                </div>
              </div>

              <button className="bg-yellow-500 text-white px-3 py-2 rounded-md w-full cursor-pointer mt-3">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center h-[600px]">
          <h1 className="text-yellow-500/80 font-bold text-5xl text-muted">
            Oh no! Your cart is empty
          </h1>
          <img src={emptyCart} alt="Empty Cart" className="w-[400px]" />
          <button
            onClick={() => navigate("/products")}
            className="bg-yellow-500 text-white px-3 py-2 rounded-md cursor-pointer"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
