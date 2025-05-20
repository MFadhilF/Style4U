import React from "react";
import { Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function DataPribadi() {
  const navigate = useNavigate(); // Hook untuk redirect
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <button onClick={() => navigate("/")} className="mb-4">
        <span className="text-4xl">&larr;</span>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Informasi Saya</h2>
            <label className="block text-sm font-medium">Username</label>
            <div className="relative">
              <input
                type="text"
                value="Sumbul_Aja"
                className="w-full border rounded-md px-4 py-2"
                readOnly
              />
              <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Nama Lengkap</label>
            <div className="relative">
              <input
                type="text"
                value="Muhammad Sumbul"
                className="w-full border rounded-md px-4 py-2"
                readOnly
              />
              <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value="sumbulji12345@gmail.com"
              className="w-full border rounded-md px-4 py-2 bg-gray-200"
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium">No Handphone</label>
            <input
              type="tel"
              value="089567441423"
              className="w-full border rounded-md px-4 py-2"
            />
          </div>

          {/* Alamat */}
          <h2 className="text-xl font-semibold">Alamat Saya</h2>

          <div>
            <label className="block text-sm font-medium">Alamat Lengkap</label>
            <div className="relative">
              <input
                type="text"
                value="Jalan Sudirman No.56 , Jambung Kulon, Surabaya, Jawa Timur"
                className="w-full border rounded-md px-4 py-2"
                readOnly
              />
              <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Kode Pos</label>
              <input
                type="text"
                value="22341"
                className="w-full border rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Kota</label>
              <div className="relative">
                <input
                  type="text"
                  value="Surabaya"
                  className="w-full border rounded-md px-4 py-2"
                  readOnly
                />
                <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Provinsi</label>
            <div className="relative">
              <input
                type="text"
                value="Jawa Timur"
                className="w-full border rounded-md px-4 py-2"
                readOnly
              />
              <Pencil className="absolute right-2 top-2.5 w-4 h-4 text-gray-500" />
            </div>
          </div>

          <div className="text-lg font-semibold mt-2 flex items-center gap-2 cursor-pointer">
            <span>Alamat Tambahan</span>
            <span className="text-2xl font-bold">+</span>
          </div>

          <button className="mt-4 bg-lime-300 text-white px-6 py-2 rounded-md hover:bg-lime-400 text-sm font-medium">
            Simpan Data
          </button>
        </div>

        {/* Foto Profil Section */}
        <div className="flex flex-col items-center justify-start mt-4 md:mt-0">
          <h2 className="text-md font-medium mb-2">Gambar Profil</h2>
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Foto Profil"
              className="w-32 h-32 rounded-full border-4 border-[#e4c9a3] object-cover"
            />
            <Pencil className="absolute bottom-1 right-1 w-5 h-5 text-gray-600 bg-white rounded-full p-1" />
          </div>
          <p className="text-xs text-center mt-2 text-gray-500 w-48">
            Gunakan gambar persegi beresolusi tinggi maksimal 1MB
          </p>

          <div className="mt-6">
            <h2 className="text-md font-medium mb-2">Jenis Kelamin</h2>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="gender" />
                Laki - laki
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input type="radio" name="gender" />
                Perempuan
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
