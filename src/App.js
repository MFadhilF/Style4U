// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import RequireAdmin from "./utils/RequireAdmin";
import DetailProduk from "./views/detailproduk";
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
import HasilPencarian from "./views/hasilpencarian.jsx";
import CheckoutPage from "./components/pages/profile/checkout-page"; // Impor halaman checkout

// Komponen proteksi untuk route private
function RequireAuth({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

// Komponen agar user yang sudah login tidak bisa akses login/register
function PublicRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/" /> : children;
}

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Private routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Homepage />
            </PublicRoute>
          }
        />
        <Route
          path="/ProductListPage"
          element={
            <RequireAuth>
              <ProductListPage />
            </RequireAuth>
          }
        />
        <Route
          path="/produk/:id"
          element={
            <RequireAuth>
              <DetailProduk />
            </RequireAuth>
          }
        />
        <Route
          path="/lebihlanjut"
          element={
            <RequireAuth>
              <LebihLanjut />
            </RequireAuth>
          }
        />
        <Route
          path="/profile"
          element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          }
        />
        <Route path="/hasil-pencarian" element={<HasilPencarian />} />
        <Route
          path="/profile/wishlist"
          element={
            <RequireAuth>
              <Wishlist />
            </RequireAuth>
          }
        />
        <Route
          path="/profile/orders"
          element={
            <RequireAuth>
              <Orders />
            </RequireAuth>
          }
        />
        <Route
          path="/checkout"
          element={
            <RequireAuth>
              <CheckoutPage />
            </RequireAuth>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <RequireAdmin>
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/produk"
          element={
            <RequireAdmin>
              <RequireAuth>
                <Produk />
              </RequireAuth>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/category"
          element={
            <RequireAdmin>
              <RequireAuth>
                <Category />
              </RequireAuth>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/pesanan"
          element={
            <RequireAdmin>
              <RequireAuth>
                <Pesanan />
              </RequireAuth>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/penjualan"
          element={
            <RequireAdmin>
              <RequireAuth>
                <Penjualan />
              </RequireAuth>
            </RequireAdmin>
          }
        />
        <Route
          path="/admin/users"
          element={
            <RequireAdmin>
              <RequireAuth>
                <Users />
              </RequireAuth>
            </RequireAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
