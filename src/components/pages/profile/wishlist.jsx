import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react"; // Mengganti dengan ikon yang konsisten
import CardProduk from "../../layouts/cardproduk.jsx";

export default function WishlistPage() {
  const navigate = useNavigate();

  // State untuk menampung data dari API
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fungsi untuk mengambil data wishlist
  const fetchWishlist = async () => {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    if (!token || !id_user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:3001/api/wishlist/${id_user}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Transformasi data agar sesuai dengan props yang diharapkan oleh CardProduk
      const transformedData = response.data.map((item) => ({
        id: item.id_produk,
        brand: item.brand_name,
        nama: item.nama,
        kategori: item.category_name,
        harga: new Intl.NumberFormat("id-ID").format(item.harga),
        grade: `Grade ${item.nama_grade}`,
        gambar: `http://localhost:3001/uploads/${item.image_url}`,
        isFavorite: true, // Semua item di halaman wishlist pasti favorit
      }));

      setWishlistItems(transformedData);
    } catch (err) {
      console.error("Gagal mengambil data wishlist:", err);
      setError("Gagal memuat wishlist Anda.");
    } finally {
      setLoading(false);
    }
  };

  // Mengambil data saat komponen pertama kali dimuat
  useEffect(() => {
    fetchWishlist();
  }, []);

  // Fungsi untuk menghapus item dari wishlist
  const handleRemoveFromWishlist = async (productId) => {
    const originalItems = [...wishlistItems];

    // Optimistic UI: Hapus item dari tampilan secara langsung
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );

    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    try {
      await axios.delete(
        `http://localhost:3001/api/wishlist/${id_user}/remove`,
        {
          headers: { Authorization: `Bearer ${token}` },
          data: { id_produk: productId },
        }
      );
      // Jika berhasil, tidak perlu melakukan apa-apa karena UI sudah diupdate
    } catch (err) {
      console.error("Gagal menghapus dari wishlist:", err);
      alert("Gagal menghapus item dari wishlist.");
      // Jika gagal, kembalikan item yang dihapus ke tampilan
      setWishlistItems(originalItems);
    }
  };

  return (
    <div className={`p-4 sm:p-6 lg:p-8 max-w-6xl md:ml-[260px]`}>
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/productlistpage")}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold">Wishlist Anda</h1>
      </div>

      {loading && <p className="text-center">Memuat wishlist...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && wishlistItems.length === 0 && (
        <p className="text-center text-gray-500 mt-8">
          Wishlist Anda masih kosong.
        </p>
      )}

      {!loading && !error && wishlistItems.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlistItems.map((produk) => (
            <CardProduk
              key={produk.id}
              produk={produk}
              // Saat tombol hati di CardProduk diklik, panggil fungsi remove
              onToggleFavorite={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
