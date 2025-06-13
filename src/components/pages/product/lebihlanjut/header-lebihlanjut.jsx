import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Loader2 } from "lucide-react";
import contohdetail from "../../../assets/contohdetail.png";

export default function MysteryBox() {
  // State untuk pilihan form
  const [style, setStyle] = useState("");
  const [size, setSize] = useState("M");
  const [optionId, setOptionId] = useState("");

  // State untuk data dinamis & UI
  const [categories, setCategories] = useState([]);
  const [boxOptions, setBoxOptions] = useState([]);
  const [price, setPrice] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const navigate = useNavigate();

  // Ambil data kategori dan opsi box dari backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [catRes, optRes] = await Promise.all([
          axios.get("http://localhost:3001/api/category"),
          axios.get("http://localhost:3001/api/mystery-box/options"),
        ]);

        setCategories(catRes.data);
        setBoxOptions(optRes.data);

        // Set nilai awal untuk form setelah data berhasil diambil
        if (catRes.data.length > 0) {
          setStyle(catRes.data[0].name);
        }
        if (optRes.data.length > 0) {
          setOptionId(optRes.data[0].id);
          setPrice(optRes.data[0].price);
        }
      } catch (error) {
        console.error("Gagal mengambil data awal untuk Mystery Box:", error);
      }
    };
    fetchData();
  }, []);

  // Handle perubahan pada pilihan ukuran box (Qty)
  const handleOptionChange = (e) => {
    const selectedId = e.target.value;
    const selectedOption = boxOptions.find((opt) => opt.id == selectedId);
    if (selectedOption) {
      setOptionId(selectedId);
      setPrice(selectedOption.price);
    }
  };

  // Handle penambahan item ke keranjang
  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Anda harus login untuk menambahkan item ke keranjang.");
      navigate("/login");
      return;
    }

    if (!style || !size || !optionId) {
      alert("Pastikan semua pilihan (Style, Size, Ukuran Box) sudah terisi.");
      return;
    }

    setIsAdding(true);
    try {
      const response = await axios.post(
        "http://localhost:3001/api/mystery-box/add-to-cart",
        { style, size, optionId }, // Body request yang dikirim ke backend
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Terjadi kesalahan saat menambahkan ke keranjang."
      );
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 items-start">
      {/* Kolom Gambar Kiri */}
      <div className="flex flex-col items-center">
        <img
          src={contohdetail}
          alt="Style Bundles"
          className="rounded-xl border shadow-lg w-full max-w-md"
        />
      </div>

      {/* Kolom Form Kanan */}
      <div className="rounded-xl border-2 border-black p-8 space-y-6 shadow-lg bg-white max-w-lg">
        <div className="text-center">
          <h2 className="text-3xl font-bold font-poppins">Mystery Box</h2>
          <p className="mt-2 text-gray-600">
            Pilih gayamu, biarkan kami yang memberi kejutan!
          </p>
        </div>

        {/* Pilihan Style */}
        <div>
          <label className="block font-medium mb-1 font-poppins">Style</label>
          <select
            value={style}
            onChange={(e) => setStyle(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-[#CAE38D] font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition"
          >
            {categories.length > 0 ? (
              categories.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))
            ) : (
              <option disabled>Memuat style...</option>
            )}
          </select>
        </div>

        {/* Pilihan Size */}
        <div>
          <label className="block font-medium mb-1 font-poppins">Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-[#89CFF0] font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          >
            <option value="S">S (Small)</option>
            <option value="M">M (Medium)</option>
            <option value="L">L (Large)</option>
            <option value="XL">XL (Extra Large)</option>
          </select>
        </div>

        {/* Pilihan Ukuran Box (Qty) */}
        <div>
          <label className="block font-medium mb-1 font-poppins">
            Pilih Ukuran Box
          </label>
          <select
            value={optionId}
            onChange={handleOptionChange}
            className="w-full border-2 border-gray-300 rounded-xl px-4 py-3 bg-[#E88430] font-poppins shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          >
            {boxOptions.length > 0 ? (
              boxOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.name}
                </option>
              ))
            ) : (
              <option disabled>Memuat pilihan...</option>
            )}
          </select>
        </div>

        {/* Tampilan Harga Dinamis */}
        <div className="text-center py-4">
          <p className="text-lg text-gray-600 font-poppins">Harga:</p>
          <p className="text-4xl font-bold text-black font-poppins">
            Rp {price.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Tombol Aksi */}
        <button
          onClick={handleAddToCart}
          disabled={isAdding || boxOptions.length === 0}
          className="w-full font-poppins bg-yellow-300 hover:bg-yellow-400 text-black font-bold text-lg py-3 px-4 rounded-xl flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200"
        >
          {isAdding ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            <ShoppingCart className="mr-2 h-6 w-6" />
          )}
          {isAdding ? "Menambahkan..." : "Tambahkan ke Keranjang"}
        </button>
      </div>
    </div>
  );
}
