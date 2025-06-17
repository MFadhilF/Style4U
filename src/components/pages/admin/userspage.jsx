import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import apiClient from "../../../api/axios";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [adminList, setAdminList] = useState([]);
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await apiClient.get("/api/admins");
      setAdminList(res.data);
    } catch (error) {
      console.error(
        "Gagal memuat admin:",
        error.response?.data || error.message
      );
    }
  };

  const openModal = () => {
    setFormData({
      nama: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSimpan = async () => {
    const { nama, email, password, confirmPassword } = formData;

    if (!nama || !email || !password || !confirmPassword) {
      alert("Semua kolom harus diisi!");
      return;
    }

    if (password !== confirmPassword) {
      alert("Password dan konfirmasi password tidak cocok!");
      return;
    }

    try {
      const payload = {
        name: formData.nama,
        email: formData.email,
        password: formData.password,
        password_confirm: formData.confirmPassword,
      };

      const res = await apiClient.post("/api/register/admin", payload);

      alert(res.data.message || "Admin berhasil ditambahkan!");
      setShowModal(false);
      fetchAdmins();
    } catch (error) {
      alert(error.response?.data?.message || "Gagal menambahkan admin.");
    }
  };

  return (
    <div className="ml-16 md:ml-56 p-6">
      {/* Tombol Tambah Admin */}
      <div className="mb-4">
        <button
          className="flex items-center gap-2 bg-[#6e3f1c] text-white px-4 py-2 rounded shadow hover:bg-[#5b3216] text-sm font-bold"
          onClick={openModal}
        >
          <Plus size={16} />
          Tambah Admin
        </button>
      </div>

      {/* Tabel Admin */}
      <div className="overflow-x-auto bg-white shadow-md rounded-lg">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-[#6e3f1c] text-white text-center">
            <tr>
              <th className="py-2 px-4">ID</th>
              <th className="py-2 px-4">Nama</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
            </tr>
          </thead>
          <tbody>
            {adminList.length > 0 ? (
              adminList.map((admin) => (
                <tr
                  key={admin.id_user}
                  className="border-t border border-[#B08968]"
                >
                  <td className="py-2 px-4 text-center border border-[#B08968]">
                    {admin.id_user}
                  </td>
                  <td className="py-2 px-4 text-center border border-[#B08968]">
                    {admin.name}
                  </td>
                  <td className="py-2 px-4 text-center border border-[#B08968]">
                    {admin.email}
                  </td>
                  <td className="py-2 px-4 text-center border border-[#B08968]">
                    {admin.id_role === 1 ? "Admin" : "User"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4">
                  Memuat data admin...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Tambah Admin */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-96 shadow-lg">
            <h2 className="text-lg font-bold mb-4 text-[#6e3f1c]">
              Tambah Admin
            </h2>
            <input
              type="text"
              name="nama"
              value={formData.nama}
              onChange={handleChange}
              placeholder="Nama"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3"
            />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Konfirmasi Password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-lime-500 hover:bg-lime-600 text-white font-bold px-4 py-2 rounded"
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

export default Users;
