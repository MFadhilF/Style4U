// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailProduk from "./views/detailproduk";
import Home from "./App.jsx"; // ini merujuk ke Home yang ada di App.jsx
import LebihLanjut from "./views/lebihlanjut.jsx";
import Profile from "./views/profile.jsx";
import Wishlist from "./views/profile-wishlist.jsx";
import Orders from "./views/profile-orders.jsx";
import Homepage from "./views/homepage";
import ProductListPage from "./views/ProductListPage";
import Login from "./views/login.jsx";
import Register from "./views/register.jsx";
import Dashboard from "./views/admin/dashboard.jsx";
import Produk from "./views/admin/produk.jsx";
import Category from "./views/admin/category.jsx";
import Penjualan from "./views/admin/penjualan.jsx";
import Pesanan from "./views/admin/pesanan.jsx";
import Users from "./views/admin/users.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/detailproduk" element={<DetailProduk />} />
        <Route path="/lebihlanjut" element={<LebihLanjut />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/wishlist" element={<Wishlist />} />
        <Route path="/profile/orders" element={<Orders />} />
        {/* Tambahkan route lain di sini jika diperlukan */}
        <Route path="/" element={<Homepage />} />
        <Route path="/ProductListPage" element={<ProductListPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*Routes Admin*/}
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/produk" element={<Produk />} />
        <Route path="/admin/category" element={<Category />} />
        <Route path="/admin/pesanan" element={<Pesanan />} />
        <Route path="/admin/penjualan" element={<Penjualan />} />
        <Route path="/admin/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;
