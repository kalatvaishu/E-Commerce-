import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./componets/Navbar";
import Footer from "./componets/Footer";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Products from "./Pages/Products";
import Product2 from "./Pages/Product2";
import Cart from "./Pages/Cart";

import axios from "axios";
import ProductRouter from "./componets/ProductRouter";
import CategoryProduct from "./Pages/CategoryProduct";
import SinglePage from "./Pages/SinglePage";


const App = () => {
  const [location, setLocation] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(false);

  const getLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation isn't supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const response = await axios.get(
            `https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`
          );
          const data = response.data;
          setLocation({
            county: data.address?.county || "Unknown County",
            state: data.address?.state || "Unknown State",
          });
        } catch (err) {
          alert("Failed to retrieve address info");
          console.error(err);
        }
      },
      (err) => {
        alert("Unable to retrieve your location. Please allow permissions.");
        console.error(err);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };
  return (
    <>
      <BrowserRouter>
        <Navbar
          location={location}
          getLocation={getLocation}
          openDropdown={openDropdown}
          setOpenDropdown={setOpenDropdown}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product2" element={<Product2 />} />
          <Route path="/category/:category" element={<CategoryProduct />} />
          <Route path="product/:id" element={<SinglePage />} />
          <Route path="/products2/:id" element={<SinglePage />} />

          <Route
            path="/cart"
            element={
              <ProductRouter>
                <Cart loaction={location} getLocation={getLocation} />
              </ProductRouter>
            }
          ></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
