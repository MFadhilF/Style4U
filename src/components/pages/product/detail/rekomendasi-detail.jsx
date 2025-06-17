import React, { useState, useEffect } from "react";
import apiClient from "../../../../api/axios";
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
        // 1. Gunakan apiClient untuk mengambil produk
        const produkRes = await apiClient.get("/api/produk");

        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");
        let wishlistIds = new Set();
        if (token && id_user) {
          try {
            // 2. Gunakan apiClient untuk mengambil wishlist
            const wishlistRes = await apiClient.get(`/api/wishlist/${id_user}`);
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

        const translatedProducts = produkRes.data.map((p) => ({
          id: p.id_produk,
          name: p.nama,
          // 3. Gunakan variabel .env untuk URL gambar
          img: `${process.env.REACT_APP_IMAGE_BASE_URL}/uploads/${p.image_url}`,
          brand: p.brand_name,
          price: (p.harga || 0).toLocaleString("id-ID"),
          grade: p.nama_grade,
          gender: p.gender,
          isFavorite: wishlistIds.has(p.id_produk),
        }));

        setProducts(translatedProducts.slice(0, 4));
      } catch (error) {
        console.error("Gagal mengambil data rekomendasi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

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
      if (wasFavorite) {
        await apiClient.delete(`/api/wishlist/${id_user}/remove`, {
          data: { id_produk: productId },
        });
      } else {
        await apiClient.post(`/api/wishlist/${id_user}/add`, {
          id_produk: productId,
        });
      }
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
