import React from "react";
import { ArrowLeft } from "lucide-react";
import shipping from "../../assets/standardshipping.png";

export default function Orders() {
  return (
    <div className="w-full h-full">
      {/* Tombol kembali tetap di luar kontainer konten */}
      <div className="ml-8 mt-4">
        <ArrowLeft className="w-5 h-5 cursor-pointer" />
      </div>

      {/* Konten utama */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-[947px]">
          {/* Header rata kiri */}
          <h1 className="text-xl font-semibold mb-6">Pesanan Anda</h1>

          {/* Step Progress */}
          <div className="flex items-center justify-between w-full mb-8 mx-auto">
            {/* Step 1 */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-300 text-white flex items-center justify-center text-sm">
                1
              </div>
              <span className="text-sm text-gray-600">Pengiriman</span>
            </div>

            <div className="flex-1 h-[1px] bg-gray-300 mx-2" />

            {/* Step 2 */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center text-sm">
                2
              </div>
              <span className="text-sm font-medium">Metode Pembayaran</span>
            </div>

            <div className="flex-1 h-[1px] bg-gray-300 mx-2" />

            {/* Step 3 */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm">
                3
              </div>
              <span className="text-sm text-gray-800">Ringkasan</span>
            </div>
          </div>

          {/* Alamat Box */}
          <div className="border rounded-lg p-4 flex justify-between items-center shadow-sm">
            <div>
              <p className="font-semibold">Alamat “Sumbul Markambul”</p>
              <p className="text-sm text-gray-600 mt-1 leading-snug">
                Jalan Sudirman No.56 , Jambangan Kulon, Surabaya, Jawa Timur
                <br />
                22341, Surabaya
              </p>
            </div>
            <div className="text-right">
              <img
                src={shipping}
                alt="Standard Shipping"
                className="w-[94px] h-[94px]"
              />
            </div>
          </div>

          {/* Tambah Alamat */}
          <div className="text-sm text-right mt-2 text-gray-800 underline cursor-pointer">
            Tambah alamat
          </div>
        </div>
      </div>
    </div>
  );
}
