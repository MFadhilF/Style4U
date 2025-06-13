import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/layouts/navbar.jsx";
import Detail from "../components/pages/product/detail/header-detail.jsx";
import DeskripsiDetail from "../components/pages/product/detail/deskripsi-detail.jsx";
import RekomendasiDetail from "../components/pages/product/detail/rekomendasi-detail.jsx";
import Footer from "../components/layouts/footer";

export default function DetailProduk() {
  const { id } = useParams(); // Ambil ID dari URL, misal: "1"
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProductById = async () => {
        try {
          setLoading(true);
          const res = await axios.get(`http://localhost:3001/api/produk/${id}`);
          setProduct(res.data);
        } catch (error) {
          console.error("Gagal mengambil detail produk:", error);
          setProduct(null); // Set null jika produk tidak ditemukan atau error
        } finally {
          setLoading(false);
        }
      };
      fetchProductById();
    }
  }, [id]); // Efek ini akan berjalan lagi jika ID di URL berubah

  if (loading) {
    return <div>Loading...</div>; // Tampilkan pesan loading
  }

  if (!product) {
    return <div>Produk tidak ditemukan.</div>; // Tampilkan jika produk tidak ada
  }

  return (
    <>
      <Header />
      <main>
        {/* Kirim data 'product' sebagai props ke komponen anak */}
        <Detail product={product} />
        <div className="mt-10 w-full h-[2px] bg-[#000000]"></div>
        <DeskripsiDetail product={product} />
        <div className="mt-10 w-full h-[2px] bg-[#000000]"></div>
        <RekomendasiDetail />
      </main>
      <Footer />
    </>
  );
}
