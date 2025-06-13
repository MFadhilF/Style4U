import React, { useState, useEffect } from "react";

export default function AddressModal({ isOpen, onClose, onSave, initialData }) {
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
        is_utama: initialData.is_utama || false,
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

        {/* Form Fields */}
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
            className="h-4 w-4"
          />
          <label htmlFor="is_utama" className="text-sm">
            Jadikan alamat utama
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-sm"
          >
            Batal
          </button>
          <button
            onClick={handleSaveClick}
            className="px-4 py-2 rounded-md bg-lime-500 text-white hover:bg-lime-600 text-sm"
          >
            Simpan Alamat
          </button>
        </div>
      </div>
    </div>
  );
}
