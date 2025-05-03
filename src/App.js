import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./cartContext";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import ImageUploadPage from "./pages/ImageUploadPage";
import UserTypePage from "./pages/UserTypePage";
import EventDescriptionPage from "./pages/EventDescriptionPage";
import ThemeSelectionPage from "./pages/ThemeSelectionPage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import ColorPalette from "./pages/ColorPalette";


function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/upload" element={<ImageUploadPage />} />
          <Route path="/user-type" element={<UserTypePage />} />
          <Route path="/describe" element={<EventDescriptionPage />} />
          <Route path="/themes" element={<ThemeSelectionPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
