import React, { useState, useRef } from "react"; // Impor useState dan useRef
import { Pencil } from "lucide-react";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { ChevronDown, ChevronRight } from "lucide-react";

export default function DataPribadi() {
  // const navigate = useNavigate();

  // State untuk nilai jenis kelamin yang terpilih
  const [selectedGender, setSelectedGender] = useState(""); // Nilai awal kosong
  // State untuk mengontrol visibilitas dropdown/listbox jenis kelamin
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const genderSelectRef = useRef(null); // Ref untuk select element

  const handleGoBack = () => {
    console.log("Tombol kembali diklik");
    // navigate(-1);
  };

  const toggleGenderDropdown = () => {
    setIsGenderDropdownOpen((prevState) => !prevState);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    setIsGenderDropdownOpen(false); // Tutup dropdown setelah memilih
  };

  const handleGenderKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleGenderDropdown();
    }
  };

  // Menangani klik di luar untuk menutup dropdown (opsional, tapi UX baik)
  // Ini memerlukan setup event listener yang lebih kompleks di useEffect,
  // untuk saat ini kita buat simpel: onBlur pada select.

  return (
    <div className={`p-4 sm:p-6 lg:p-8 max-w-6xl md:ml-[260px]`}>
      {" "}
      {/* Sesuaikan md:ml-[260px] dengan lebar sidebar Anda */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-x-2 sm:gap-x-3 mb-4 sm:mb-6">
            <button
              onClick={handleGoBack}
              className="text-gray-600 hover:text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              aria-label="Kembali"
            >
              <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <h1 className="text-xl font-bold">Wishlist Anda</h1>
          </div>

          {/* ... field Username, Nama Lengkap, Email, No Handphone ... */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <div className="relative">
              <input
                type="text"
                id="username"
                value="Sumbul_Aja"
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
          <div>
            <label
              htmlFor="namaLengkap"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nama Lengkap
            </label>
            <div className="relative">
              <input
                type="text"
                id="namaLengkap"
                value="Muhammad Sumbul"
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value="sumbulji12345@gmail.com"
              className="w-full border border-gray-300 rounded-md px-3 py-2 bg-gray-100 shadow-sm text-sm sm:text-base"
              readOnly
            />
          </div>
          <div>
            <label
              htmlFor="noHandphone"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              No Handphone
            </label>
            <input
              type="tel"
              id="noHandphone"
              value="089567441423"
              className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
            />
          </div>

          {/* === BAGIAN JENIS KELAMIN DENGAN CUSTOM TOGGLE === */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jenis Kelamin
            </label>
            {/* Tombol/Area Klik yang terlihat seperti input */}
            <div
              className="relative flex items-center justify-between w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm bg-white cursor-pointer "
              onClick={toggleGenderDropdown}
              onKeyDown={handleGenderKeyDown}
              role="combobox" // Peran yang lebih sesuai untuk kontrol kustom seperti ini
              aria-haspopup="listbox"
              aria-expanded={isGenderDropdownOpen}
              tabIndex={0} // Agar bisa difokus
              aria-controls="jenis-kelamin-options"
            >
              <span
                className={`text-sm sm:text-base ${
                  selectedGender ? "text-gray-900" : "text-gray-500"
                }`}
              >
                {selectedGender === "laki-laki"
                  ? "Laki - laki"
                  : selectedGender === "perempuan"
                  ? "Perempuan"
                  : "Pilih jenis kelamin"}
              </span>
              {isGenderDropdownOpen ? (
                <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> // SUDAH DIKLIK (terbuka) -> ChevronDown
              ) : (
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" /> // BELUM DIKLIK (tertutup) -> ChevronRight
              )}
            </div>

            {/* Dropdown/Listbox Opsi yang Muncul/Hilang */}
            {isGenderDropdownOpen && (
              <div className="relative mt-1 z-10">
                {" "}
                {/* z-10 agar muncul di atas elemen lain jika perlu */}
                <ul
                  id="jenis-kelamin-options"
                  role="listbox"
                  aria-label="Pilihan Jenis Kelamin"
                  className="absolute w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto  text-sm sm:text-base"
                  ref={genderSelectRef} // Untuk auto-focus atau manajemen fokus lainnya
                  tabIndex={-1} // Agar listbox bisa difokus secara programatik jika perlu
                >
                  {["laki-laki", "perempuan"].map((genderOption) => (
                    <li
                      key={genderOption}
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        selectedGender === genderOption
                          ? "bg-white-50 text-white-700 font-semibold"
                          : "text-gray-900"
                      }`}
                      onClick={() => {
                        setSelectedGender(genderOption);
                        setIsGenderDropdownOpen(false);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          setSelectedGender(genderOption);
                          setIsGenderDropdownOpen(false);
                        }
                      }}
                      role="option"
                      aria-selected={selectedGender === genderOption}
                      tabIndex={0} // Agar setiap opsi bisa difokus
                    >
                      {genderOption === "laki-laki"
                        ? "Laki - laki"
                        : "Perempuan"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* === AKHIR BAGIAN JENIS KELAMIN === */}

          <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-gray-800">
            Alamat Saya
          </h2>

          {/* ... field Alamat Lengkap, Kode Pos, Kota, Provinsi ... */}
          <div>
            <label
              htmlFor="alamatLengkap"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Alamat Lengkap
            </label>
            <div className="relative">
              <input
                type="text"
                id="alamatLengkap"
                value="Jalan Sudirman No.56 , Jambung Kulon, Surabaya, Jawa Timur"
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label
                htmlFor="kodePos"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kode Pos
              </label>
              <input
                type="text"
                id="kodePos"
                value="22341"
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label
                htmlFor="kota"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Kota
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="kota"
                  value="Surabaya"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                  readOnly
                />
                <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
              </div>
            </div>
          </div>
          <div>
            <label
              htmlFor="provinsi"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Provinsi
            </label>
            <div className="relative">
              <input
                type="text"
                id="provinsi"
                value="Jawa Timur"
                className="w-full border border-gray-300 rounded-md px-3 py-2 shadow-sm focus:ring-lime-500 focus:border-lime-500 text-sm sm:text-base"
                readOnly
              />
              <Pencil className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>

          <div className="text-sm sm:text-base font-semibold mt-2 flex items-center gap-2 cursor-pointer text-lime-600 hover:text-lime-700">
            <span>Alamat Tambahan</span>
            <span className="text-lg sm:text-xl font-bold">+</span>
          </div>

          <button className="mt-6 bg-lime-500 text-white px-6 py-2 sm:py-2.5 rounded-md hover:bg-lime-600 text-sm font-medium w-full sm:w-auto shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 transition-colors">
            Simpan Data
          </button>
        </div>

        {/* Foto Profil Section */}
        <div className="md:col-span-1 flex flex-col items-center text-center md:items-start md:text-left justify-start mt-8 md:mt-0 order-first md:order-last">
          <h2 className="text-base sm:text-lg font-semibold mb-3 text-gray-800">
            Gambar Profil
          </h2>
          <div className="relative mb-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Foto Profil"
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full border-4 border-[#e4c9a3] object-cover shadow-lg"
            />
            <button
              aria-label="Ubah foto profil"
              className="absolute bottom-1 right-1 w-6 h-6 sm:w-7 sm:h-7 text-gray-700 bg-white rounded-full p-1 shadow hover:bg-gray-100 transition-colors flex items-center justify-center"
            >
              <Pencil className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
          </div>
          <p className="text-xs text-gray-600 w-full max-w-[200px] sm:max-w-xs mx-auto md:mx-0">
            Gunakan gambar persegi beresolusi tinggi maksimal 1MB
          </p>
        </div>
      </div>
    </div>
  );
}
