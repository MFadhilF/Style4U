import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./productcard.jsx";
import Banner from "./banner.jsx";

export default function ListProduct() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["all"]);
  const [activeCatId, setActiveCatId] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = localStorage.getItem("token");
        const id_user = localStorage.getItem("id_user");

        // Ambil data produk dan kategori
        const [produkRes, categoryRes] = await Promise.all([
          axios.get("http://localhost:3001/api/produk"),
          axios.get("http://localhost:3001/api/category"),
        ]);

        let wishlistIds = new Set(); // Buat Set kosong sebagai default

        // Jika user sudah login, ambil data wishlistnya
        if (token && id_user) {
          try {
            const wishlistRes = await axios.get(
              `http://localhost:3001/api/wishlist/${id_user}`,
              {
                headers: { Authorization: `Bearer ${token}` },
              }
            );
            // Buat Set dari ID produk di wishlist untuk pencarian cepat
            wishlistIds = new Set(
              wishlistRes.data.map((item) => item.id_produk)
            );
          } catch (wishlistError) {
            console.error(
              "Gagal mengambil data wishlist, mungkin user belum punya wishlist.",
              wishlistError
            );
            // Biarkan wishlistIds kosong jika gagal
          }
        }

        // Transformasi data produk sambil mengecek status favorit
        const transformedProducts = produkRes.data.map((p) => ({
          id: p.id_produk,
          id_cat: p.id_cat,
          name: p.nama,
          price: new Intl.NumberFormat("id-ID").format(p.harga),
          category: p.category_name || "Uncategorized",
          grade: p.nama_grade,
          img: `http://localhost:3001/uploads/${p.image_url}`,
          brand: p.brand_name,
          gender: p.gender || "Unisex",
          // Tentukan status favorit dengan mengecek ke wishlistIds
          isFavorite: wishlistIds.has(p.id_produk),
        }));

        setProducts(transformedProducts);
        setCategories(categoryRes.data);
      } catch (error) {
        console.error("Gagal mengambil data awal:", error);
      }
    };

    fetchInitialData();
  }, []);

  // toggle favorite
  const handleToggleFav = async (productId) => {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    // 1. Cek apakah user sudah login
    if (!token || !id_user) {
      alert("Anda harus login untuk menggunakan fitur wishlist.");
      return;
    }

    // 2. Simpan state asli untuk jaga-jaga jika API gagal
    const originalProducts = [...products];

    // 3. Optimistic UI: Langsung update tampilan seolah-olah berhasil
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );

    // Cari tahu status favorit produk sebelum di-toggle
    const productToToggle = originalProducts.find((p) => p.id === productId);
    const wasFavorite = productToToggle.isFavorite;

    try {
      // 4. Kirim request ke API
      if (wasFavorite) {
        // Jika sebelumnya sudah favorit, maka HAPUS dari wishlist
        await axios.delete(
          `http://localhost:3001/api/wishlist/${id_user}/remove`,
          {
            headers: { Authorization: `Bearer ${token}` },
            data: { id_produk: productId }, // Kirim id_produk di body untuk DELETE
          }
        );
      } else {
        // Jika belum favorit, maka TAMBAHKAN ke wishlist
        await axios.post(
          `http://localhost:3001/api/wishlist/${id_user}/add`,
          { id_produk: productId }, // Kirim id_produk di body untuk POST
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
    } catch (error) {
      // 5. Jika API gagal, kembalikan tampilan ke state semula dan beri notifikasi
      console.error("Gagal update wishlist:", error);
      alert(
        error.response?.data?.message ||
          "Gagal memperbarui wishlist. Silakan coba lagi."
      );
      setProducts(originalProducts);
    }
  };

  // filter & paginate
  const filtered =
    activeCatId === "all"
      ? products
      : products.filter((p) => p.id_cat === activeCatId);

  const totalPages = Math.ceil(filtered.length / perPage);
  const startIdx = (currentPage - 1) * perPage;
  const pagedProducts = filtered.slice(startIdx, startIdx + perPage);

  const goToPage = (n) => {
    setCurrentPage(Math.min(Math.max(n, 1), totalPages));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="p-6">
      <Banner />
      {/* FILTER TABS */}
      <ul className="flex flex-wrap gap-2 mb-6 font-playfair">
        {/* Tombol "Semua" dibuat manual */}
        <li>
          <button
            onClick={() => {
              setActiveCatId("all");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border hover:bg-gray-100 focus:outline-none transition ${
              activeCatId === "all"
                ? "bg-yellow-300 border-yellow-300"
                : "border-gray-300"
            }`}
          >
            Semua
          </button>
        </li>

        {/* Tombol kategori dari API */}
        {categories.map((cat) => (
          <li key={cat.id}>
            <button
              onClick={() => {
                setActiveCatId(cat.id); // Set ID kategori sebagai filter aktif
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-full border hover:bg-gray-100 focus:outline-none transition ${
                activeCatId === cat.id
                  ? "bg-yellow-300 border-yellow-300"
                  : "border-gray-300"
              }`}
            >
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
      {/* PRODUCT GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto justify-items-center">
        {pagedProducts.map((p) => (
          <ProductCard
            key={p.id}
            product={p}
            onToggleFavorite={handleToggleFav}
          />
        ))}
      </div>
      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2 text-gray-700 font-playfair">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50 font-playfair"
          >
            Sebelumnya
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`
                px-3 py-1 rounded
                ${
                  currentPage === i + 1
                    ? "bg-gray-300 font-semibold"
                    : "hover:bg-gray-100 font-playfair"
                }
              `}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50 font-playfair"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}
