import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { useCart } from "../Context/CartContext";

const Navbar = ({ location, getLocation, openDropdown, setOpenDropdown }) => {
  const [openNav, setOpenNav] = useState(false);
  const { cartItem } = useCart();
  const toggleDropdown = () => {
    setOpenDropdown(!openDropdown);
  };
  return (
    <>
      <div className="bg-white py-3 shadow-2xl px-4 md:px-0">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex gap-7 items-center">
            <Link to={"/"}>
              <h1 className="font-bold text-3xl">
                <span className="text-yellow-500 font-serif">J</span>alvix
              </h1>
            </Link>

            <div className="md:flex gap-2 cursor-pointer text-gray-700 items-center hidden ">
              <span className="font-semibold">
                {location ? (
                  <div className="-space-y-2">
                    <p>{location.county}</p>
                    <p>{location.state}</p>
                  </div>
                ) : (
                  "Add Address"
                )}
              </span>
              <span
                onClick={toggleDropdown}
                className="ml-1 select-none cursor-pointer"
              >
                ▼
              </span>
            </div>
            {openDropdown && (
              <div className="w-[250px] h-max shadow-2xl z-50 bg-white fixed top-16 left-60 border-2 p-5 border-gray-100 rounded-md">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="font-semibold text-xl">Change Location</h1>
                  <span
                    onClick={toggleDropdown}
                    className="cursor-pointer text-xl font-bold"
                  >
                    ×
                  </span>
                </div>
                <button
                  onClick={getLocation}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md curor-pointer hover:bg-red-400"
                >
                  Detect my Location
                </button>
              </div>
            )}
          </div>
          <nav className="flex gap-7 items-center">
            <ul className="md:flex gap-7 items-center text-xl font-semibold hidden">
              <NavLink
                to={"/"}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-yellow-500" : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Home</li>
              </NavLink>

              <NavLink
                to={"/products"}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-yellow-500" : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Products</li>
              </NavLink>

              <NavLink
                to={"/product2"}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-yellow-500" : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Products2</li>
              </NavLink>

              <NavLink
                to={"/about"}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-yellow-500" : "text-black"
                  } cursor-pointer`
                }
              >
                <li>About</li>
              </NavLink>

              <NavLink
                to={"/contact"}
                className={({ isActive }) =>
                  `${
                    isActive ? "border-b-4 border-yellow-500" : "text-black"
                  } cursor-pointer`
                }
              >
                <li>Contact</li>
              </NavLink>
            </ul>

            <Link to={"/cart"} className="relative">
              <span className="text-2xl">🛒</span>
              <span className="bg-yellow-500 px-2 rounded-full absolute -top-3 -right-3 text-white text-sm">
                {cartItem.length}
              </span>
            </Link>
            <div className="hidden md:block">
              <SignedOut>
                <SignInButton className="bg-yellow-500 text-white px-3 py-1 rounded-md cursor-pointer" />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>

            <div
              className="md:hidden text-3xl ml-2 cursor-pointer select-none"
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? "✕" : "☰"}
            </div>
          </nav>
        </div>

        {/* mobile nav */}
        {openNav && (
          <div className="md:hidden mt-2 bg-white border-t py-4 px-6 shadow-md text-lg font-semibold">
            <ul className="space-y-4">
              <li>
                <NavLink to={"/"} onClick={() => setOpenNav(false)}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/products"} onClick={() => setOpenNav(false)}>
                  Products
                </NavLink>
              </li>
              <li>
                <NavLink to={"/about"} onClick={() => setOpenNav(false)}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to={"/contact"} onClick={() => setOpenNav(false)}>
                  Contact
                </NavLink>
              </li>

              <li>
                <SignedOut>
                  <SignInButton className="bg-yellow-500 text-white px-3 py-1 rounded-md cursor-pointer" />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
