import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./landing_Page/home/HomePage";
import Signup from "./landing_Page/signup/Signup";
import Login from "./landing_Page/login/Login";
import AboutPage from "./landing_Page/about/AboutPage";
import PricingPage from "./landing_Page/pricing/PricingPage";
import SupportPage from "./landing_Page/support/SupportPage";
import Navbar from "./landing_Page/Navbar";
import Footer from "./landing_Page/Footer";
import ProductsPage from "./landing_Page/products/ProductsPage";
import NotFound from "./landing_Page/NotFound";
import DashboardPage from "./landing_Page/dashboard/DashboardPage";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/about" element={<AboutPage />}></Route>
      <Route path="/product" element={<ProductsPage />}></Route>
      <Route path="/pricing" element={<PricingPage />}></Route>
      <Route path="/support" element={<SupportPage />}></Route>
      <Route path="/dashboard" element={<DashboardPage />}></Route>
      <Route path="*" element={<NotFound/>}></Route>
    </Routes>
    <Footer />
  </BrowserRouter>
);