// HasilPencarian.jsx (Versi Final dengan Debounce & Kategori Dinamis)

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import _ from "lodash"; // Kita akan gunakan lodash untuk debounce

import SidebarFilter from "../components/layouts/sidebarfilter.jsx";
import SearchResultPage from "../components/pages/searchresult/searchresultpage.jsx";

export default function HasilPencarian() {
  const [searchParams, setSearchParams] = useSearchParams();

  // State untuk data
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State baru untuk kategori
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State untuk filter
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    grade: searchParams.get("grade") || "",
    gender: searchParams.get("gender") || "",
    brand: searchParams.get("brand") || "",
    min_price: searchParams.get("min_price") || "",
    max_price: searchParams.get("max_price") || "",
    sort_by: "newest",
  });

  // Fungsi untuk mengambil data produk dari backend
  // useCallback digunakan untuk optimasi, agar fungsi ini tidak dibuat ulang setiap render
  const fetchProducts = useCallback(
    _.debounce((currentFilters) => {
      setLoading(true);
      setError(null);

      // Buat salinan filter yang bersih untuk URL, hapus nilai kosong
      const cleanFilters = Object.entries(currentFilters).reduce(
        (acc, [key, value]) => {
          if (value) {
            acc[key] = value;
          }
          return acc;
        },
        {}
      );

      const params = new URLSearchParams(cleanFilters).toString();

      axios
        .get(`http://localhost:3001/api/produk?${params}`)
        .then((response) => {
          const translatedProducts = response.data.map((backendProduct) => ({
            id: backendProduct.id_produk,
            name: backendProduct.nama,
            img: `http://localhost:3001/uploads/${backendProduct.image_url}`,
            brand: backendProduct.brand_name,
            price: (backendProduct.harga || 0).toLocaleString("id-ID"),
            grade: backendProduct.nama_grade,
            gender: backendProduct.gender,
            isFavorite: false,
          }));
          setProducts(translatedProducts);
          setSearchParams(cleanFilters, { replace: true });
        })
        .catch((err) => {
          console.error("Error fetching products:", err);
          setError("Gagal memuat produk. Silakan coba lagi.");
        })
        .finally(() => {
          setLoading(false);
        });
    }, 500),
    []
  ); // Jeda 500ms setelah user berhenti mengetik

  // useEffect untuk mengambil KATEGORI saat komponen pertama kali dimuat
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil daftar kategori:", error);
      });
  }, []); // Hanya berjalan sekali

  // useEffect untuk memanggil fetchProducts setiap kali filter berubah
  useEffect(() => {
    fetchProducts(filters);
  }, [filters, fetchProducts]);

  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const handleToggleFavorite = (productId) => {
    console.log("Toggle favorite for product:", productId);
  };

  return (
    <main className="flex">
      <SidebarFilter filters={filters} onFilterChange={handleFilterChange} />
      <SearchResultPage
        products={products}
        categories={categories} // Kirim kategori ke komponen anak
        loading={loading}
        error={error}
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  );
}
