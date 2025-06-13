// rekomendasi-detail.jsx (Versi Final Dinamis)

import React, { useState, useEffect } from "react";
import axios from "axios";

// 1. Impor ProductCard yang sudah ada
import ProductCard from "../../catalog/productcard.jsx";

import shopsustain from "../../../assets/shop-sustain.png";
import fastshipping from "../../../assets/fast-shipping.png";
import washbefore from "../../../assets/wash-before.png";

const RekomendasiDetail = () => {
  // 2. State untuk menampung produk dari API dan status loading
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. useEffect untuk mengambil data saat komponen dimuat
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        // Ambil data produk
        const produkRes = await axios.get("http://localhost:3001/api/produk");

        // Ambil data wishlist user jika login
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");
        let wishlistIds = new Set();
        if (token && id_user) {
          try {
            const wishlistRes = await axios.get(
              `http://localhost:3001/api/wishlist/${id_user}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            wishlistIds = new Set(
              wishlistRes.data.map((item) => item.id_produk)
            );
          } catch (wishlistError) {
            console.error(
              "Tidak dapat mengambil wishlist untuk rekomendasi:",
              wishlistError
            );
          }
        }

        // 4. "Terjemahkan" data agar cocok dengan ProductCard
        const translatedProducts = produkRes.data.map((p) => ({
          id: p.id_produk,
          name: p.nama,
          img: `http://localhost:3001/uploads/${p.image_url}`,
          brand: p.brand_name,
          price: (p.harga || 0).toLocaleString("id-ID"),
          grade: p.nama_grade,
          gender: p.gender,
          isFavorite: wishlistIds.has(p.id_produk),
        }));

        // 5. Ambil beberapa produk saja sebagai rekomendasi (misal: 4 produk pertama)
        setProducts(translatedProducts.slice(0, 4));
      } catch (error) {
        console.error("Gagal mengambil data rekomendasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []); // Array kosong berarti hanya berjalan sekali

  // 6. Logika untuk handle wishlist (mirip seperti di ListProduct)
  const handleToggleFavorite = async (productId) => {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");
    if (!token || !id_user) {
      alert("Anda harus login untuk menggunakan fitur wishlist.");
      return;
    }

    const originalProducts = [...products];
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );

    const productToToggle = originalProducts.find((p) => p.id === productId);
    const wasFavorite = productToToggle.isFavorite;

    try {
      const url = `http://localhost:3001/api/wishlist/${id_user}/${
        wasFavorite ? "remove" : "add"
      }`;
      const method = wasFavorite ? "delete" : "post";
      await axios({
        method: method,
        url: url,
        data: { id_produk: productId },
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Gagal update wishlist:", error);
      alert(error.response?.data?.message || "Gagal memperbarui wishlist.");
      setProducts(originalProducts);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-poppins mb-6 text-center md:text-left">
        Rekomendasi Produk
      </h1>

      {/* 7. Tampilkan produk hasil fetch atau tampilkan loading */}
      <div className="flex gap-6 flex-wrap justify-center">
        {loading ? (
          <p>Memuat rekomendasi...</p>
        ) : (
          products.map((produk) => (
            <ProductCard
              key={produk.id}
              product={produk}
              onToggleFavorite={handleToggleFavorite}
            />
          ))
        )}
      </div>

      {/* Section info (tetap sama) */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <img
            src={washbefore}
            alt="Wash Before Wear"
            className="mx-auto mb-4 h-16"
          />
          <h3 className="font-bold">WASH BEFORE WEAR</h3>
          <p className="mt-2 text-[14px] font-poppins">
            Kami sudah mencuci pakaian sebelum dijual kembali. Alangkah baiknya
            mencucinya kembali setelah anda mendapatkan pakaiannya.
          </p>
        </div>
        <div>
          <img
            src={fastshipping}
            alt="Fast Shipping"
            className="mx-auto mb-4 h-16"
          />
          <h3 className="font-bold">FAST SHIPPING</h3>
          <p className="mt-2 text-[14px] font-poppins">
            Kami mengirimkan dalam 1-2 hari kerja, menggunakan kemasan ramah
            lingkungan dan plastik daur ulang.
          </p>
        </div>
        <div>
          <img
            src={shopsustain}
            alt="Shop Sustainably"
            className="mx-auto mb-4 h-16"
          />
          <h3 className="font-bold">SHOP SUSTAINABLY</h3>
          <p className="mt-2 text-[14px] font-poppins">
            Setiap pembelian yang anda lakukan akan mengeluarkan pakaian dari
            pembuangan sampah, sehingga memberikan pakaian kehidupan kembali.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiDetail;
