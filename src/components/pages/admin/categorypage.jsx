import React, { useState } from "react";
import { Plus } from "lucide-react";

const Produk = () => {
  const [produkList, setProdukList] = useState([
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
  const handleSimpan = () => {
    if (newKategori.trim() === "") return;

    if (isEditMode) {
      setProdukList((prev) =>
        prev.map((item) =>
          item.id === selectedId ? { ...item, nama: newKategori } : item
        )
      );
    } else {
      const newId =
        produkList.length > 0 ? produkList[produkList.length - 1].id + 1 : 1;
      setProdukList([...produkList, { id: newId, nama: newKategori }]);
    }

    setNewKategori("");
    setShowModal(false);
    setIsEditMode(false);
    setSelectedId(null);
  };

  // Hapus kategori
  const handleDelete = (id) => {
    const konfirmasi = window.confirm("Yakin ingin menghapus kategori ini?");

    if (konfirmasi) {
      setProdukList((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="ml-16 md:ml-56 p-6">
      {/* Header */}
      <div className="flex justify-end items-center border-b pb-4 mb-6">
        <span className="text-sm text-gray-600">
          Selamat Datang, <strong>Alif</strong>
        </span>
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="w-8 h-8 rounded-full ml-3"
        />
      </div>

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

      {/* Tabel Produk */}
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
            {produkList.map((produk, index) => (
              <tr key={produk.id} className="text-center">
                <td className="py-2 px-4 border border-[#B08968]">
                  {index + 1}
                </td>
                <td className="py-2 px-4 border border-[#B08968]">
                  {produk.nama}
                </td>
                <td className="py-2 px-4 border border-[#B08968]">
                  <div className="flex flex-wrap gap-2 justify-center">
                    <button
                      className="bg-lime-400 w-[110px] h-[40px] hover:bg-lime-500 text-white px-3 py-1 rounded font-bold text-[14px]"
                      onClick={() => openEditModal(produk.id, produk.nama)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 w-[110px] h-[40px] hover:bg-red-600 text-white px-3 py-1 rounded font-bold text-[14px]"
                      onClick={() => handleDelete(produk.id)}
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
                className="bg-lime-300 hover:bg-lime-400 text-white font-bold px-4 py-2 rounded"
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

export default Produk;
