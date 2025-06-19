import React, { useState, useEffect } from "react";
import apiClient from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CardProduk from "../../layouts/cardproduk.jsx";

export default function WishlistPage() {
  const navigate = useNavigate();

  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchWishlist = async () => {
    const id_user = localStorage.getItem("id_user");
    if (!localStorage.getItem("token") || !id_user) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);
      const response = await apiClient.get(`/api/wishlist/${id_user}`);

      const transformedData = response.data.map((item) => ({
        id: item.id_produk,
        brand: item.brand_name,
        nama: item.nama,
        kategori: item.category_name,
        harga: new Intl.NumberFormat("id-ID").format(item.harga),
        grade: `Grade ${item.nama_grade}`,
        gambar: `${process.env.REACT_APP_IMAGE_BASE_URL}/${item.image_url}`,
        isFavorite: true,
      }));

      setWishlistItems(transformedData);
    } catch (err) {
      console.error("Gagal mengambil data wishlist:", err);
      setError("Gagal memuat wishlist Anda.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    const originalItems = [...wishlistItems];
    setWishlistItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );

    const id_user = localStorage.getItem("id_user");

    try {
      await apiClient.delete(`/api/wishlist/${id_user}/remove`, {
        data: { id_produk: productId },
      });
    } catch (err) {
      console.error("Gagal menghapus dari wishlist:", err);
      alert("Gagal menghapus item dari wishlist.");
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
              onToggleFavorite={handleRemoveFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
