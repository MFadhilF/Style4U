import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Pencil, ArrowLeft, Trash2, Edit } from "lucide-react";

// Komponen Modal Alamat (bisa diletakkan di file terpisah seperti AddressModal.jsx)
const AddressModal = ({ isOpen, onClose, onSave, initialData }) => {
  const [addressData, setAddressData] = useState({
    label_alamat: "",
    alamat_lengkap: "",
    provinsi: "",
    kota: "",
    kode_pos: "",
    is_utama: false,
  });

  useEffect(() => {
    if (initialData) {
      setAddressData({
        label_alamat: initialData.label_alamat || "",
        alamat_lengkap: initialData.alamat_lengkap || "",
        provinsi: initialData.provinsi || "",
        kota: initialData.kota || "",
        kode_pos: initialData.kode_pos || "",
        is_utama: !!initialData.is_utama,
      });
    } else {
      setAddressData({
        label_alamat: "",
        alamat_lengkap: "",
        provinsi: "",
        kota: "",
        kode_pos: "",
        is_utama: false,
      });
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddressData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSaveClick = () => {
    onSave(addressData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 space-y-4">
        <h2 className="text-xl font-bold">
          {initialData ? "Edit Alamat" : "Tambah Alamat Baru"}
        </h2>
        <input
          name="label_alamat"
          value={addressData.label_alamat}
          onChange={handleChange}
          placeholder="Label Alamat (e.g., Rumah, Kantor)"
          className="w-full border rounded-md p-2"
        />
        <textarea
          name="alamat_lengkap"
          value={addressData.alamat_lengkap}
          onChange={handleChange}
          placeholder="Alamat Lengkap"
          className="w-full border rounded-md p-2"
          rows="3"
        ></textarea>
        <input
          name="kota"
          value={addressData.kota}
          onChange={handleChange}
          placeholder="Kota"
          className="w-full border rounded-md p-2"
        />
        <input
          name="provinsi"
          value={addressData.provinsi}
          onChange={handleChange}
          placeholder="Provinsi"
          className="w-full border rounded-md p-2"
        />
        <input
          name="kode_pos"
          value={addressData.kode_pos}
          onChange={handleChange}
          placeholder="Kode Pos"
          className="w-full border rounded-md p-2"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_utama"
            id="is_utama"
            checked={addressData.is_utama}
            onChange={handleChange}
            className="h-4 w-4 rounded border-gray-300 text-lime-600 focus:ring-lime-500"
          />
          <label htmlFor="is_utama" className="text-sm">
            Jadikan alamat utama
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
          >
            Batal
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 rounded-md bg-lime-500 text-white hover:bg-lime-600 text-sm font-semibold"
          >
            Simpan Alamat
          </button>
        </div>
      </div>
    </div>
  );
};

// Komponen InputField untuk data pribadi
const InputField = ({ label, name, value, onChange, ...props }) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <input
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base pr-10"
        {...props}
      />
      {name !== "email" && (
        <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      )}
    </div>
  </div>
);

// Komponen Halaman Utama Data Pribadi
export default function DataPribadi() {
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    username: "",
    name: "",
    email: "",
    no_handphone: "",
    jenis_kelamin: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");
    if (!token || !id_user) {
      navigate("/login");
      return;
    }

    setLoading(true);
    try {
      const [profileRes, addressesRes] = await Promise.all([
        axios.get(`http://localhost:3001/api/user/${id_user}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`http://localhost:3001/api/addresses/${id_user}`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);
      setProfileData(profileRes.data);
      setAddresses(addressesRes.data);
    } catch (err) {
      console.error("Gagal mengambil data:", err);
      setError("Gagal memuat data. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleSubmitProfile = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");
    try {
      const response = await axios.put(
        `http://localhost:3001/api/user/${id_user}`,
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert(response.data.message || "Profil berhasil diperbarui!");
    } catch (err) {
      setError(err.response?.data?.message || "Gagal memperbarui profil.");
      console.error("Gagal update profil:", err);
    }
  };

  const handleOpenModal = (address = null) => {
    setEditingAddress(address);
    setIsModalOpen(true);
  };

  const handleDeleteAddress = async (id_address) => {
    if (!window.confirm("Apakah Anda yakin ingin menghapus alamat ini?"))
      return;

    const token = localStorage.getItem("token");
    try {
      await axios.delete(`http://localhost:3001/api/addresses/${id_address}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
    } catch (err) {
      console.error("Gagal hapus alamat:", err);
      alert("Gagal menghapus alamat.");
    }
  };

  const handleSaveAddress = async (addressData) => {
    const token = localStorage.getItem("token");
    const id_user = localStorage.getItem("id_user");

    try {
      if (editingAddress) {
        await axios.put(
          `http://localhost:3001/api/addresses/${editingAddress.id_address}`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        await axios.post(
          `http://localhost:3001/api/addresses/${id_user}`,
          addressData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      setIsModalOpen(false);
      fetchData();
    } catch (err) {
      console.error("Gagal simpan alamat:", err);
      alert(err.response?.data?.message || "Gagal menyimpan alamat.");
    }
  };

  if (loading)
    return <div className="p-8 text-center">Memuat data profil...</div>;

  return (
    <>
      <div className={`p-4 sm:p-6 lg:p-8 max-w-6xl md:ml-[260px]`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-x-2 sm:gap-x-3 mb-4 sm:mb-6">
              <button
                type="button"
                onClick={() => navigate("/productlistpage")}
                className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100"
                aria-label="Kembali"
              >
                <ArrowLeft size={20} />
              </button>
              <h1 className="text-xl font-bold">Data Pribadi</h1>
            </div>

            <form onSubmit={handleSubmitProfile} className="space-y-6">
              <InputField
                label="Username"
                name="username"
                value={profileData.username}
                onChange={handleChange}
              />
              <InputField
                label="Nama Lengkap"
                name="name"
                value={profileData.name}
                onChange={handleChange}
              />
              <InputField
                label="Email"
                name="email"
                value={profileData.email}
                onChange={handleChange}
                readOnly
              />
              <InputField
                label="No Handphone"
                name="no_handphone"
                type="tel"
                value={profileData.no_handphone}
                onChange={handleChange}
              />
              {/* Anda bisa menambahkan input Jenis Kelamin di sini jika ingin menyimpannya bersama data pribadi */}
              <button
                type="submit"
                className="mt-6 bg-lime-500 text-white px-6 py-2 rounded-md hover:bg-lime-600 font-medium"
              >
                Simpan Data Pribadi
              </button>
            </form>

            <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800 pt-6 border-t">
              Alamat Saya
            </h2>

            <div className="space-y-4">
              {addresses.map((addr) => (
                <div
                  key={addr.id_address}
                  className="border rounded-lg p-4 flex justify-between items-start"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-bold text-gray-800">
                        {addr.label_alamat}
                      </span>
                      {addr.is_utama ? (
                        <span className="text-xs bg-lime-200 text-lime-800 font-medium px-2 py-0.5 rounded-full">
                          Utama
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm text-gray-600">
                      {addr.alamat_lengkap}
                    </p>
                    <p className="text-sm text-gray-600">
                      {addr.kota}, {addr.provinsi} {addr.kode_pos}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleOpenModal(addr)}
                      className="p-2 hover:bg-gray-100 rounded-full"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteAddress(addr.id_address)}
                      className="p-2 hover:bg-gray-100 rounded-full text-red-600"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handleOpenModal(null)}
              className="text-sm sm:text-base font-semibold mt-2 flex items-center gap-2 cursor-pointer text-lime-600 hover:text-lime-700"
            >
              <span>+ Alamat Tambahan</span>
            </button>

            {error && <p className="text-red-500 text-sm my-4">{error}</p>}
          </div>

          <div className="md:col-span-1 flex flex-col items-center text-center md:items-start md:text-left justify-start mt-8 md:mt-0 order-first md:order-last">
            <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
              Foto Profil
            </h2>
            <div className="relative mb-3">
              <img
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Foto Profil"
                className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-[#e4c9a3] object-cover shadow-lg"
              />
              <button
                type="button"
                aria-label="Ubah foto profil"
                className="absolute bottom-1 right-1 w-7 h-7 text-gray-700 bg-white rounded-full p-1 shadow hover:bg-gray-100 flex items-center justify-center"
              >
                <Pencil className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 w-full max-w-xs mx-auto md:mx-0">
              Gunakan gambar persegi beresolusi tinggi maksimal 1MB
            </p>
          </div>
        </div>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveAddress}
        initialData={editingAddress}
      />
    </>
  );
}
