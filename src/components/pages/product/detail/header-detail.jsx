import React, { useState, useEffect } from "react"; // Import useEffect
import { Heart, Share2, ShoppingCart } from "lucide-react";
import bintangBg from "../../../assets/star-bg.png";
import apiClient from "../../../../api/axios"; // Sesuaikan path jika perlu
import { useNavigate } from "react-router-dom";

export default function Detail({ product }) {
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false); // Default-nya false

  // --- LANGKAH 1: AMBIL STATUS FAVORIT SAAT KOMPONEN DIMUAT ---
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      const token = localStorage.getItem("token");
      const id_user = localStorage.getItem("id_user");
      if (!token || !id_user || !product) return;
      try {
        // Langsung gunakan apiClient dengan URL relatif
        const response = await apiClient.get(`/api/wishlist/${id_user}`);
        const isProductInWishlist = response.data.some(
          (item) => item.id_produk === product.id_produk
        );
        setIsFavorite(isProductInWishlist);
      } catch (error) {
        console.error("Gagal memeriksa status wishlist:", error);
      }
    };

    checkFavoriteStatus();
  }, [product]); // Jalankan efek ini setiap kali data produk berubah

  // --- LANGKAH 2: PERBARUI FUNGSI HANDLE UNTUK MENGIRIM API REQUEST ---
  const handleToggleFavorite = async () => {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    if (!token || !id_user) {
      alert("Anda harus login untuk menggunakan fitur wishlist.");
      return;
    }

    const wasFavorite = isFavorite;
    // Optimistic UI: langsung ubah tampilan
    setIsFavorite((prev) => !prev);

    try {
      if (wasFavorite) {
        // Menggunakan apiClient untuk DELETE
        await apiClient.delete(`/api/wishlist/${id_user}/remove`, {
          data: { id_produk: product.id_produk },
        });
      } else {
        // Menggunakan apiClient untuk POST
        await apiClient.post(`/api/wishlist/${id_user}/add`, {
          id_produk: product.id_produk,
        });
      }
    } catch (error) {
      console.error("Gagal update wishlist:", error);
      alert(error.response?.data?.message || "Gagal memperbarui wishlist.");
      // Jika gagal, kembalikan state ke semula
      setIsFavorite(wasFavorite);
    }
  };

  // --- Sisa fungsi lain tidak ada perubahan ---
  const handleAddToCart = async () => {
    if (!selectedSize) {
      alert("Silakan pilih ukuran terlebih dahulu!");
      return;
    }

    // 1. Ambil token dari localStorage
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk menambahkan ke keranjang.");
      navigate("/login"); // Arahkan ke halaman login
      return;
    }

    try {
      const payload = {
        id_produk: product.id_produk,
        quantity: quantity,
        size: selectedSize,
      };
      // Langsung panggil apiClient. Header ditangani otomatis.
      await apiClient.post("/api/cart/add", payload);
      alert(
        `${product.nama} (${selectedSize}) berhasil ditambahkan ke keranjang!`
      );
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
      alert(error.response?.data?.message || "Gagal menambahkan produk.");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link produk disalin ke clipboard!");
  };

  const stockForSelectedSize = selectedSize
    ? product.stocks.find((s) => s.size === selectedSize)?.stok || 0
    : product.stocks.reduce((acc, s) => acc + s.stok, 0);

  const incrementQuantity = () => {
    if (quantity < stockForSelectedSize) setQuantity(quantity + 1);
  };
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.harga);

  // --- JSX tetap sama, karena sudah menggunakan state 'isFavorite' ---
  return (
    <div className="flex flex-col items-center justify-center px-4 py-8">
      {/* KOTAK DETAIL PRODUK UTAMA */}
      <div className="flex w-full max-w-5xl h-auto bg-[#F0F0F7] rounded-2xl overflow-hidden flex-col md:flex-row shadow-lg">
        {/* ... Sisi Kiri: Gambar Produk ... */}
        <div className="relative w-full md:w-5/12 flex-shrink-0 flex items-center justify-center p-8 bg-blue-500 rounded-2xl md:rounded-r-none md:rounded-l-2xl">
          <img
            src={bintangBg}
            alt="bg"
            className="absolute w-full h-full object-cover opacity-80"
          />
          <img
            src={`${process.env.REACT_APP_IMAGE_BASE_URL}/uploads/${product.image_url}`}
            alt={product.nama}
            className="relative z-10 w-3/4 md:w-full max-w-[270px] h-auto object-contain drop-shadow-2xl"
          />
        </div>

        {/* ... Sisi Kanan: Informasi & Aksi ... */}
        <div className="flex flex-col justify-center p-8 md:p-10 flex-1">
          <h1 className="text-4xl md:text-5xl font-poppins font-bold leading-tight text-gray-800">
            {product.nama}
          </h1>
          <p className="mt-2 text-md text-gray-500">{product.deskripsi}</p>
          <div className="flex gap-2 mt-6 mb-3">
            {product.stocks.map(
              (s) =>
                s.stok > 0 && (
                  <button
                    key={s.size}
                    onClick={() => setSelectedSize(s.size)}
                    className={`w-10 h-10 flex items-center justify-center rounded-md border text-sm font-semibold transition ${
                      selectedSize === s.size
                        ? "bg-gray-800 text-white border-gray-800"
                        : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {s.size}
                  </button>
                )
            )}
          </div>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Stok tersedia:{" "}
            <span className="font-bold text-gray-800">
              {stockForSelectedSize}
            </span>
          </p>
          <p className="text-3xl font-bold mb-6 text-gray-900">
            {formattedPrice}
          </p>
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center border border-gray-300 rounded-full px-3 py-2 bg-white">
              <button
                className="text-lg font-bold text-gray-500 hover:text-black disabled:opacity-50"
                onClick={decrementQuantity}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="mx-4 font-semibold text-md">{quantity}</span>
              <button
                className="text-lg font-bold text-gray-500 hover:text-black disabled:opacity-50"
                onClick={incrementQuantity}
                disabled={!selectedSize || quantity >= stockForSelectedSize}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="bg-gray-800 text-white rounded-full px-4 py-2.5 text-sm font-semibold flex items-center gap-2 hover:bg-gray-700"
            >
              <ShoppingCart size={16} /> Tambahkan ke Keranjang
            </button>
          </div>
        </div>
      </div>

      {/* BAGIAN BAWAH: FAVORIT & SHARE */}
      <div className="flex items-center justify-center w-full max-w-5xl mt-6 text-sm">
        <button
          onClick={handleToggleFavorite}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-red-500"
        >
          <Heart
            size={20}
            className={`transition-all ${
              isFavorite ? "fill-red-500 text-red-500" : "fill-none"
            }`}
          />
          Favoritku
        </button>
        <div className="h-6 border-l border-gray-300 mx-4"></div>
        <button
          onClick={handleShare}
          className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-500"
        >
          <Share2 size={20} />
          Share Produk
        </button>
      </div>
    </div>
  );
}
