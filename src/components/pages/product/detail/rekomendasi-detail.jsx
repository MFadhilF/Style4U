import React from "react";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import shopsustain from "../../../assets/shop-sustain.png";
import fastshipping from "../../../assets/fast-shipping.png";
import washbefore from "../../../assets/wash-before.png";
import denimrobek from "../../../assets/denimrobek.png";
import jeanslukis from "../../../assets/jeanslukis.png";
import jaketkulit from "../../../assets/jaketkulit.png";
import { useState } from "react";

const cardProduk = [
  {
    id: 1,
    brand: "UNIQLO",
    nama: "Denim Robek",
    kategori: "Man",
    harga: "Rp 95.000",
    grade: "Grade A",
    gambar: denimrobek,
  },
  {
    id: 2,
    brand: "H&M",
    nama: "Jeans Lukis",
    kategori: "Man",
    harga: "Rp 80.000",
    grade: "Grade A",
    gambar: jeanslukis,
  },
  {
    id: 3,
    brand: "UNIQLO",
    nama: "Jaket Kulit",
    kategori: "Man",
    harga: "Rp 125.000",
    grade: "Grade A",
    gambar: jaketkulit,
  },
];

const CardProduk = ({ produk }) => {
  const [liked, setLiked] = useState(false); // <-- dipindahkan ke dalam
  const toggleLike = () => setLiked(!liked);

  return (
    <div className="w-[250px] rounded-xl border p-4 flex flex-col items-center shadow-lg">
      <div className="relative w-full h-[250px] bg-gray-100 rounded-md">
        <img
          src={produk.gambar}
          alt={produk.nama}
          className="w-full h-full object-cover rounded-md"
        />
        <div className="absolute top-2 right-2">
          <button onClick={toggleLike}>
            {liked ? (
              <HeartSolid className="h-6 w-6 text-red-500" />
            ) : (
              <HeartOutline className="h-6 w-6 text-black" />
            )}
          </button>
        </div>
        <div className="absolute top-2 left-2">
          <p className="text-[12px] font-playfair">{produk.brand}</p>
        </div>
      </div>
      <div className="mt-2 text-center">
        <h3 className="font-playfair font-bold text-lg text-start">
          {produk.nama}{" "}
          <span className="text-[11px] font-playfair">{produk.kategori}</span>
        </h3>
        <div className="flex flex-row justify-between gap-[80px]">
          <p className="text-base">{produk.harga}</p>
          <p className="text-sm mt-1">{produk.grade}</p>
        </div>
      </div>
    </div>
  );
};

const RekomendasiDetail = () => {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="-ml-[90px] text-2xl font-bold mb-6">Rekomendasi Produk</h1>
      <div className="flex gap-6 flex-wrap justify-center">
        {cardProduk.map((produk) => (
          <CardProduk key={produk.id} produk={produk} />
        ))}
      </div>

      {/* Section info */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <img
            src={washbefore}
            alt="Wash Before Wear"
            className="mx-auto mb-4"
          />
          <h3 className="font-bold">WASH BEFORE WEAR</h3>
          <p className="mt-2 text-[14px] font-poppins">
            Kami sudah mencuci pakaian sebelum dijual kembali. Alangkah baiknya
            mencucinya kembali setelah anda mendapatkan pakaiannya.
          </p>
        </div>
        <div>
          <img
            src={fastshipping}
            alt="Fast Shipping"
            className="mx-auto mb-4"
          />
          <h3 className="font-bold">FAST SHIPPING</h3>
          <p className="mt-2 text-[14px] font-poppins">
            Kami mengirimkan dalam 1-2 hari kerja, menggunakan kemasan ramah
            lingkungan dan plastik daur ulang.
          </p>
        </div>
        <div>
          <img
            src={shopsustain}
            alt="Shop Sustainably"
            className="mx-auto mb-4"
          />
          <h3 className="font-bold">SHOP SUSTAINABLY</h3>
          <p className="mt-2 text-[14px] font-poppins">
            Setiap pembelian yang anda lakukan akan mengeluarkan pakaian dari
            pembuangan sampah, sehingga memberikan pakaian kehidupan kembali.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RekomendasiDetail;
