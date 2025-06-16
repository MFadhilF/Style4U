import React, { useState, useEffect } from "react";
import axios from "axios";
import { Plus, ImagePlus } from "lucide-react";

const Produk = () => {
  const [showModal, setShowModal] = useState(false);
  const [produkList, setProdukList] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    deskripsi: "",
    harga: "",
    id_grade: "",
    id_cat: "",
    id_brand: "",
    gender: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const [stokSizeList, setStokSizeList] = useState([{ size: "", stok: "" }]);
  const [categories, setCategories] = useState([]);
  const [grades, setGrades] = useState([]);
  const [brands, setBrands] = useState([]);
  const [editingProdukId, setEditingProdukId] = useState(null);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [selectedProdukInfo, setSelectedProdukInfo] = useState(null);

  // Fetch produk saat halaman dimuat
  useEffect(() => {
    fetchProduk();
    fetchCategories();
    fetchGrades();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/category");

      setCategories(res.data);
    } catch (error) {
      console.error("Gagal mengambil data kategori:", error);
    }
  };

  const fetchGrades = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/grades");
      setGrades(res.data);
    } catch (error) {
      console.error("Gagal mengambil data grade:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/brands");
      console.log("Brands data:", res.data); // <-- Tambahkan ini
      setBrands(res.data);
    } catch (error) {
      console.error("Gagal mengambil data Brand:", error);
    }
  };

  const handleStokSizeChange = (index, field, value) => {
    const newList = [...stokSizeList];
    newList[index][field] = value;
    setStokSizeList(newList);
  };

  const handleAddStokSize = () => {
    setStokSizeList([...stokSizeList, { size: "", stok: "" }]);
  };

  const handleRemoveStokSize = (index) => {
    const newList = [...stokSizeList];
    newList.splice(index, 1);
    setStokSizeList(newList);
  };

  const fetchProduk = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/produk");
      setProdukList(res.data);
    } catch (error) {
      console.error("Gagal mengambil data produk:", error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 10 * 1024 * 1024) {
      setSelectedImage(file);
    } else {
      alert("Ukuran file maksimum 10MB.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    // Salin semua data dari formData
    const data = new FormData();
    data.append("nama", formData.nama);
    data.append("deskripsi", formData.deskripsi);
    data.append("harga", formData.harga);
    data.append("id_grade", formData.id_grade);
    data.append("id_cat", formData.id_cat);
    data.append("id_brand", formData.id_brand);
    data.append("gender", formData.gender);
    data.append("stok", JSON.stringify(stokSizeList));

    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      if (editingProdukId) {
        await axios.put(
          `http://localhost:3001/api/produk/${editingProdukId}`,
          data,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        alert("Produk berhasil diperbarui!");
      } else {
        await axios.post("http://localhost:3001/api/produk", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Produk berhasil ditambahkan!");
      }

      closeAndResetModal();
      fetchProduk();
    } catch (error) {
      console.error("Gagal menyimpan produk:", error);
      alert("Terjadi kesalahan saat menyimpan produk.");
    }
  };

  const handleDelete = async (id_produk) => {
    const isConfirmed = window.confirm(
      "Apakah Anda yakin ingin menghapus produk ini?"
    );

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3001/api/produk/${id_produk}`);
        alert("Produk berhasil dihapus!");
        fetchProduk();
      } catch (error) {
        console.error("Gagal menghapus produk:", error);
        alert("Terjadi kesalahan saat menghapus produk.");
      }
    }
  };

  const handleEditClick = (produk) => {
    setEditingProdukId(produk.id_produk);
    setFormData({
      nama: produk.nama,
      deskripsi: produk.deskripsi,
      harga: produk.harga,
      id_grade: produk.id_grade,
      id_cat: produk.id_cat,
      id_brand: produk.id_brand,
      gender: produk.gender,
    });
    // Pastikan stok dalam format yang benar, atau set default jika kosong
    setStokSizeList(
      produk.stocks && produk.stocks.length > 0
        ? produk.stocks
        : [{ size: "", stok: "" }]
    );
    setSelectedImage(null); // Reset gambar saat edit
    setShowModal(true);
  };

  const closeAndResetModal = () => {
    setShowModal(false);
    setEditingProdukId(null);
    setFormData({
      nama: "",
      deskripsi: "",
      harga: "",
      id_grade: "",
      id_cat: "",
      id_brand: "",
      gender: "",
    });
    setSelectedImage(null);
    setStokSizeList([{ size: "", stok: "" }]);
  };

  const handleInfoClick = async (produk) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/api/produk/${produk.id_produk}`
      );
      setSelectedProdukInfo(res.data);
      setShowInfoModal(true);
    } catch (error) {
      console.error("Gagal mengambil detail produk:", error);
      alert("Tidak dapat memuat detail produk. Silakan coba lagi.");
    }
  };

  return (
    <div className="ml-16 md:ml-56 p-6">
      {/* Tombol Tambah Produk */}
      <div className="mb-4">
        <button
          className="flex items-center gap-2 bg-[#6e3f1c] text-white px-4 py-2 rounded-md shadow hover:bg-[#5b3216] font-bold text-sm"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Tambah Produk
        </button>
      </div>

      {/* Modal Tambah Produk */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-4xl shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Tambah Produk</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Nama Produk"
              />
              <input
                name="deskripsi"
                value={formData.deskripsi}
                onChange={handleChange}
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Deskripsi Produk"
              />
              <input
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                type="text"
                className="w-full border rounded px-3 py-2 text-sm"
                placeholder="Harga Produk"
              />
              <select
                name="id_grade"
                value={formData.id_grade}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">-- Pilih Grade --</option>
                {grades.map((grade) => (
                  <option key={grade.id} value={grade.id}>
                    {grade.nama_grade}
                  </option>
                ))}
              </select>

              <select
                name="id_cat"
                value={formData.id_cat}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">-- Pilih Kategori --</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                name="id_brand"
                value={formData.id_brand}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">-- Pilih Brand --</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.nama}
                  </option>
                ))}
              </select>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 text-sm"
              >
                <option value="">-- Pilih Gender --</option>
                <option value="Man">Pria</option>
                <option value="Woman">Wanita</option>
                <option value="Unisex">Unisex</option>
              </select>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm mb-1 font-semibold">
                  Stok Per Ukuran
                </label>
                {stokSizeList.map((item, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select
                      name="size"
                      value={item.size}
                      onChange={(e) =>
                        handleStokSizeChange(index, "size", e.target.value)
                      }
                      className="w-1/2 border rounded px-3 py-2 text-sm"
                    >
                      <option value="">-- Pilih Ukuran --</option>
                      <option value="XS">XS</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>

                    <input
                      type="number"
                      name="stok"
                      placeholder="Jumlah"
                      value={item.stok}
                      onChange={(e) =>
                        handleStokSizeChange(index, "stok", e.target.value)
                      }
                      className="w-1/2 border rounded px-3 py-2 text-sm"
                    />
                    {stokSizeList.length > 1 && (
                      <button
                        onClick={() => handleRemoveStokSize(index)}
                        className="text-red-500 font-bold"
                      >
                        X
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={handleAddStokSize}
                  className="text-sm text-blue-600 hover:underline"
                >
                  + Tambah Ukuran
                </button>
              </div>

              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm mb-1">Gambar Produk</label>
                <div className="border rounded-lg flex flex-col items-center justify-center p-4 h-40 relative">
                  <ImagePlus className="text-gray-400 w-10 h-10 mb-2" />

                  <label
                    htmlFor="imageUpload"
                    className="bg-[#6e3f1c] text-white text-sm px-3 py-1 rounded hover:bg-[#5b3216] cursor-pointer"
                  >
                    Pilih Gambar
                  </label>
                  <input
                    id="imageUpload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageChange}
                  />

                  {selectedImage && (
                    <div className="mt-2 text-xs text-gray-700 text-center">
                      <p>Preview:</p>
                      <img
                        src={URL.createObjectURL(selectedImage)}
                        alt="Preview"
                        className="mt-1 max-h-24 rounded"
                      />
                      <p className="mt-1">{selectedImage.name}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={closeAndResetModal}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm"
              >
                Kembali
              </button>
              <button
                onClick={handleSubmit}
                className="bg-lime-500 text-white px-4 py-2 rounded hover:bg-lime-600 text-sm"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {showInfoModal && selectedProdukInfo && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl shadow-lg transform transition-all">
            <h2 className="text-xl font-semibold mb-4 border-b pb-2">
              Detail Produk
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Kolom Gambar */}
              <div className="md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gambar
                </label>
                {selectedProdukInfo.image_url ? (
                  <img
                    src={`http://localhost:3001/uploads/${selectedProdukInfo.image_url}`}
                    alt={selectedProdukInfo.nama}
                    className="w-full h-auto object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-full h-40 flex items-center justify-center bg-gray-100 rounded-lg border">
                    <span className="text-gray-500">Tidak ada gambar</span>
                  </div>
                )}
              </div>

              {/* Kolom Detail & Stok */}
              <div className="md:col-span-2 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Nama Produk
                  </label>
                  <p className="text-lg font-semibold text-gray-800">
                    {selectedProdukInfo.nama}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Deskripsi
                  </label>
                  <p className="text-gray-700">
                    {selectedProdukInfo.deskripsi}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Harga
                  </label>
                  <p className="text-gray-700">
                    Rp{" "}
                    {Number(selectedProdukInfo.harga).toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Kategori
                    </label>
                    <p className="text-gray-700">
                      {categories.find(
                        (c) => c.id === selectedProdukInfo.id_cat
                      )?.name || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Brand
                    </label>
                    <p className="text-gray-700">
                      {brands.find((b) => b.id === selectedProdukInfo.id_brand)
                        ?.nama || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Grade
                    </label>
                    <p className="text-gray-700">
                      {grades.find((g) => g.id === selectedProdukInfo.id_grade)
                        ?.nama_grade || "-"}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">
                      Gender
                    </label>
                    <p className="text-gray-700">
                      {selectedProdukInfo.gender || "-"}
                    </p>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">
                    Stok per Ukuran
                  </label>
                  <div className="mt-1 space-y-1">
                    {selectedProdukInfo.stocks.map((s, i) =>
                      s.size && s.stok ? (
                        <div
                          key={i}
                          className="flex justify-between text-sm border-b pb-1"
                        >
                          <span className="text-gray-700">
                            Ukuran {s.size}:
                          </span>
                          <span className="font-medium">{s.stok} pcs</span>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Tombol Kembali */}
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setShowInfoModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 text-sm"
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tabel Produk */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg mt-6">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Nama Barang</th>
              <th className="py-2 px-4">Stok</th>
              <th className="py-2 px-4">Harga</th>
              <th className="py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {produkList.map((produk, index) => {
              // 1. Menghitung total stok dari semua ukuran
              const totalStok = Array.isArray(produk.stocks)
                ? produk.stocks.reduce((acc, item) => acc + (item.stok || 0), 0)
                : 0;

              return (
                // 2. Menggunakan key yang benar (id_produk)
                <tr key={produk.id_produk} className="border border-[#B08968]">
                  <td className="py-2 px-4 text-center">{index + 1}</td>
                  {/* 3. Menampilkan nama produk, bukan deskripsi */}
                  <td className="py-2 px-4">{produk.nama}</td>
                  {/* 4. Menampilkan total stok yang sudah dihitung */}
                  <td className="py-2 px-4 text-center">{totalStok}</td>
                  <td className="py-2 px-4 text-center">Rp.{produk.harga}</td>
                  <td className="py-2 px-4 flex gap-2 justify-center">
                    <button
                      onClick={() => handleEditClick(produk)}
                      className="bg-green-400 hover:bg-lime-500 text-white px-3 py-1 rounded text-sm font-bold"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(produk.id_produk)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-bold"
                    >
                      Hapus
                    </button>
                    <button
                      onClick={() => handleInfoClick(produk)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-bold"
                    >
                      Info
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Produk;
