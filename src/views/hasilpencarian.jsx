import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import apiClient from "../api/axios";
import _ from "lodash";

import SidebarFilter from "../components/layouts/sidebarfilter.jsx";
import SearchResultPage from "../components/pages/searchresult/searchresultpage.jsx";

export default function HasilPencarian() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
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

  const fetchProducts = useCallback(
    _.debounce((currentFilters) => {
      setLoading(true);
      setError(null);

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

      apiClient
        .get(`/api/produk?${params}`)
        .then((response) => {
          const translatedProducts = response.data.map((backendProduct) => ({
            id: backendProduct.id_produk,
            name: backendProduct.nama,
            img: `${process.env.REACT_APP_API_BASE_URL}${backendProduct.image_url}`,
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
  );

  useEffect(() => {
    apiClient
      .get("/api/category")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("Gagal mengambil daftar kategori:", error);
      });
  }, []);

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
        categories={categories}
        loading={loading}
        error={error}
        filters={filters}
        onFilterChange={handleFilterChange}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  );
}
