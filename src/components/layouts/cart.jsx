import React, { useState, useEffect } from "react";
import axios from "axios";
import { Trash2, Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Helper ini tidak lagi diperlukan di sini karena id_user diambil dari token
// const getUserId = () => localStorage.getItem("id_user");

export default function Cart({ show, onClose }) {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fungsi untuk mengambil data keranjang dari API
  const fetchCartItems = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token tidak ditemukan, user belum login.");
      setLoading(false);
      return;
    }

    // Buat config header dengan token otorisasi
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    try {
      setLoading(true);
      // Panggil endpoint baru yang lebih aman
      const res = await axios.get("http://localhost:3001/api/cart", config);
      setCartItems(res.data);
    } catch (error) {
      console.error("Gagal mengambil item keranjang:", error);
      // Jika token salah/kadaluwarsa, error 401/403 akan ditangkap di sini
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (show) {
      fetchCartItems();
    }
  }, [show]);

  const handleApiRequest = async (method, url, data) => {
    const token = localStorage.getItem("token");
    if (!token)
      return alert("Sesi Anda telah berakhir, silakan login kembali.");

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: data, // 'data' digunakan khusus untuk method 'delete'
      };

      await axios[method](url, data, config);
      fetchCartItems(); // Muat ulang data keranjang setelah aksi berhasil
    } catch (error) {
      console.error(`Gagal melakukan aksi ${method} pada ${url}:`, error);
      alert(`Gagal memperbarui keranjang.`);
    }
  };

  // Fungsi untuk UPDATE kuantitas item
  const handleUpdateQuantity = (item, newQuantity) => {
    handleApiRequest("put", "http://localhost:3001/api/cart/update", {
      id_produk: item.id_produk,
      size: item.size,
      quantity: newQuantity,
    });
  };

  // Fungsi untuk MENGHAPUS item
  const handleRemoveItem = async (id_produk, size) => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Sesi Anda berakhir, silakan login kembali.");
    if (!window.confirm(`Hapus item ini (${size}) dari keranjang?`)) return;

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };
      const body = { id_produk, size };

      // UBAH DARI axios.delete MENJADI axios.post
      await axios.post("http://localhost:3001/api/cart/remove", body, config); // <-- PERUBAHAN DI SINI

      fetchCartItems(); // Muat ulang data keranjang
    } catch (error) {
      console.error("Gagal menghapus item:", error);
      alert("Gagal menghapus item.");
    }
  };

  // Fungsi untuk PROSES PESANAN
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    // Kirim data item keranjang ke halaman checkout via state
    navigate("/checkout", { state: { checkoutItems: cartItems } });
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const formatPrice = (value) => value.toLocaleString("id-ID");

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md h-auto max-h-[90vh] rounded-xl shadow-lg bg-gradient-to-b from-green-100 via-white to-purple-100 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h2 className="text-lg font-semibold">Keranjang Pesanan</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-gray-500 hover:text-black"
          >
            ×
          </button>
        </div>

        {/* Konten */}
        <div className="flex-1 overflow-y-auto px-4">
          {loading ? (
            <p className="p-4 text-center">Memuat keranjang...</p>
          ) : cartItems.length === 0 ? (
            <p className="p-4 text-center text-gray-500">
              Keranjang Anda kosong.
            </p>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={`${item.id_produk}-${item.size}`}
                  className="flex gap-4 items-center p-2 border-b border-gray-200"
                >
                  <img
                    src={`http://localhost:3001/uploads/${item.image}`}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1 text-sm">
                    <h3 className="font-semibold text-base">{item.name}</h3>
                    <p className="text-gray-600">{item.qty} pcs</p>
                    <p className="font-bold text-gray-800 my-1">
                      Rp {formatPrice(item.price)}
                    </p>
                    <span className="text-xs bg-white border border-gray-300 rounded px-2 py-0.5">
                      {item.size}
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-between h-full">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleUpdateQuantity(item, item.qty + 1)}
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() =>
                          item.qty > 1
                            ? handleUpdateQuantity(item, item.qty - 1)
                            : handleRemoveItem(item.id_produk, item.size)
                        }
                        className="p-1 rounded-full hover:bg-gray-200"
                      >
                        <Minus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() =>
                        handleRemoveItem(item.id_produk, item.size)
                      }
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => navigate("/produk")}
                className="w-full text-sm text-blue-600 py-3 text-center"
              >
                + Tambah Pesanan
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t-2 border-gray-200 p-4 text-sm bg-white/50 backdrop-blur-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-base text-gray-600">Total</span>
              <span className="font-semibold text-lg">
                IDR {formatPrice(subtotal)}
              </span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-yellow-400 text-black text-center font-bold py-3 text-sm rounded-lg hover:bg-yellow-500 transition-colors"
            >
              PROSES PESANAN
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
