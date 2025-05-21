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
        <Route path="/" element={< Homepage/>} />
        <Route path="/ProductListPage" element={< ProductListPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
