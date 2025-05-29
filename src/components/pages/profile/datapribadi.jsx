import React from "react";
import { Pencil } from "lucide-react";

export default function DataPribadi() {
  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto"> {/* Sedikit padding lebih kecil di layar xs */}
      <button className="mb-4">
        <span className="text-3xl sm:text-4xl">&larr;</span> {/* Ukuran font responsif */}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"> {/* Gap disesuaikan */}
        {/* Form Section */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold mb-2">Informasi Saya</h2> {/* Ukuran font responsif */}
            <label className="block text-sm font-medium text-gray-700">Username</label> {/* Warna teks untuk kontras */}
            <div className="relative mt-1"> {/* Margin top kecil */}
              <input
                type="text"
                value="Sumbul_Aja"
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500" // Styling form standar
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /> {/* Posisi ikon disesuaikan */}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nama Lengkap</label>
            <div className="relative mt-1">
              <input
                type="text"
                value="Muhammad Sumbul"
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              value="sumbulji12345@gmail.com"
              className="w-full border border-gray-300 rounded-md px-4 py-2 bg-gray-100 shadow-sm" // Sedikit beda bg untuk readonly
              readOnly
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">No Handphone</label>
            <input
              type="tel"
              value="089567441423"
              className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 shadow-sm focus:ring-lime-500 focus:border-lime-500"
            />
          </div>

          {/* Alamat */}
          <h2 className="text-lg sm:text-xl font-semibold pt-4">Alamat Saya</h2> {/* Padding top untuk separasi */}

          <div>
            <label className="block text-sm font-medium text-gray-700">Alamat Lengkap</label>
            <div className="relative mt-1">
              <input
                type="text"
                value="Jalan Sudirman No.56 , Jambung Kulon, Surabaya, Jawa Timur"
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Mengubah grid menjadi 1 kolom di layar kecil, 2 kolom di layar sm ke atas */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Kode Pos</label>
              <input
                type="text"
                value="22341"
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 shadow-sm focus:ring-lime-500 focus:border-lime-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Kota</label>
              <div className="relative mt-1">
                <input
                  type="text"
                  value="Surabaya"
                  className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                  readOnly
                />
                <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Provinsi</label>
            <div className="relative mt-1">
              <input
                type="text"
                value="Jawa Timur"
                className="w-full border border-gray-300 rounded-md px-4 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="text-base sm:text-lg font-semibold mt-2 flex items-center gap-2 cursor-pointer text-lime-600 hover:text-lime-700"> {/* Warna dan ukuran font disesuaikan */}
            <span>Alamat Tambahan</span>
            <span className="text-xl sm:text-2xl font-bold">+</span>
          </div>

          <button className="mt-6 bg-lime-500 text-white px-6 py-2.5 rounded-md hover:bg-lime-600 text-sm font-medium w-full sm:w-auto shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500"> {/* Tombol lebih menonjol dan responsif width */}
            Simpan Data
          </button>
        </div>

        {/* Foto Profil Section */}
        {/* Mengatur ulang urutan flex untuk layar kecil agar judul di atas, lalu gambar */}
        <div className="flex flex-col items-center justify-start mt-8 md:mt-0 order-first md:order-last"> {/* Margin top di layar kecil, dan urutan */}
          <h2 className="text-base sm:text-md font-medium mb-2 text-gray-800">Gambar Profil</h2> {/* Ukuran font dan warna */}
          <div className="relative">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Foto Profil"
              // Ukuran gambar sedikit lebih kecil di layar sangat kecil
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#e4c9a3] object-cover shadow-lg"
            />
            <Pencil className="absolute bottom-1 right-1 w-5 h-5 text-gray-700 bg-white rounded-full p-1 shadow" /> {/* Warna ikon dan shadow */}
          </div>
          <p className="text-xs text-center mt-3 text-gray-600 w-full max-w-xs sm:w-48"> {/* Lebar teks disesuaikan, max-w-xs untuk mobile */}
            Gunakan gambar persegi beresolusi tinggi maksimal 1MB
          </p>

          <div className="mt-6 w-full max-w-xs sm:w-auto"> {/* Lebar kontainer jenis kelamin */}
            <h2 className="text-base sm:text-md font-medium mb-2 text-gray-800">Jenis Kelamin</h2>
            {/* Mengubah flex direction menjadi column di layar kecil */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="radio" name="gender" className="form-radio text-lime-600 focus:ring-lime-500"/>
                Laki - laki
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input type="radio" name="gender" className="form-radio text-lime-600 focus:ring-lime-500"/>
                Perempuan
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}