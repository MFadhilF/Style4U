import React, { useState } from "react";
import { Plus } from "lucide-react";
import axios from "axios";
import { useEffect } from "react";

const Category = () => {
  useEffect(() => {
    fetchKategori();
  }, []);

  const fetchKategori = async () => {
    try {
      const res = await axios.get("http://localhost:3001/api/category");
      setKategoriList(res.data);
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
    }
  };

  const [kategoriList, setKategoriList] = useState([
    { id: 1, nama: "Vintage 90s" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newKategori, setNewKategori] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  // Open modal untuk tambah
  const openTambahModal = () => {
    setIsEditMode(false);
    setNewKategori("");
    setShowModal(true);
  };

  // Open modal untuk edit
  const openEditModal = (id, nama) => {
    setIsEditMode(true);
    setSelectedId(id);
    setNewKategori(nama);
    setShowModal(true);
  };

  // Simpan data baru atau edit
  const handleSimpan = async () => {
    if (newKategori.trim() === "") return;

    try {
      if (isEditMode) {
        await axios.put(`http://localhost:3001/api/category/${selectedId}`, {
          name: newKategori,
        });
      } else {
        await axios.post("http://localhost:3001/api/category", {
          name: newKategori,
        });
      }

      fetchKategori(); // Refresh data
      setNewKategori("");
      setShowModal(false);
      setIsEditMode(false);
      setSelectedId(null);
    } catch (err) {
      console.error("Gagal menyimpan kategori:", err);
    }
  };

  // Hapus kategori
  const handleDelete = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus kategori ini?");
    if (!konfirmasi) return;

    try {
      await axios.delete(`http://localhost:3001/api/category/${id}`);
      fetchKategori(); // Refresh setelah delete
    } catch (err) {
      console.error("Gagal menghapus kategori:", err);
    }
  };

  return (
    <div className="ml-16 md:ml-56 p-6">

      {/* Tombol Tambah Kategori */}
      <div className="mb-4">
        <button
          className="flex items-center gap-2 bg-[#6e3f1c] text-white px-4 py-2 rounded-lg shadow hover:bg-[#5b3216] text-sm font-bold"
          onClick={openTambahModal}
        >
          <Plus size={16} />
          Tambah Kategori
        </button>
      </div>

      {/* Tabel Category */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border border-[#B08968] border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-2 px-4 border border-[#B08968]">No</th>
              <th className="py-2 px-[130px] border border-[#B08968]">
                Nama Kategori
              </th>
              <th className="py-2 border border-[#B08968]">Status</th>
            </tr>
          </thead>
          <tbody>
            {kategoriList.map((kategori, index) => (
              <tr key={kategori.id} className="text-start">
                <td className="py-2 px-4 border border-[#B08968]">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border border-[#B08968]">
                  {kategori.name}
                </td>
                <td className="py-2 px-4 border border-[#B08968]">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="bg-green-400 w-[110px] h-[40px] hover:bg-lime-500 text-white px-3 py-1 rounded text-[14px] font-bold"
                      onClick={() => openEditModal(kategori.id, kategori.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 w-[110px] h-[40px] hover:bg-red-600 text-white px-3 py-1 rounded font-bold text-[14px]"
                      onClick={() => handleDelete(kategori.id)}
                    >
                      Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah/Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-[#6e3f1c]">
              {isEditMode ? "Edit Kategori" : "Tambah Kategori"}
            </h2>
            <input
              type="text"
              value={newKategori}
              onChange={(e) => setNewKategori(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-[#6e3f1c]"
              placeholder="Masukkan nama kategori"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-2 rounded"
                onClick={handleSimpan}
              >
                Simpan
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Kembali
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
