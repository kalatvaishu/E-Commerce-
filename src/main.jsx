import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import { DataProvider } from "./Context/DataContaxt.jsx";
import { NewDataProvider } from "./Context/NewDataContaxt.jsx";
import { CartProvider } from "./Context/CartContext.jsx";
import { ToastContainer } from "react-toastify";
import ScrollToTop from "react-scroll-to-top";
// import ScrollToTop from "react-scroll-to-top";

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <DataProvider>
      <CartProvider>
        <NewDataProvider>
          <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <App />
            <ScrollToTop
              color="white"
              smooth
              style={{
                backgroundColor: "#F1C40F",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            />
            <ToastContainer />
          </ClerkProvider>
        </NewDataProvider>
      </CartProvider>
    </DataProvider>
  </StrictMode>
);
