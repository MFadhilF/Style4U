import React from "react";
import promoModel from "../../assets/model1.png";
import Background from "../../assets/background.png";
import KaosPendek from "../../assets/Kaospendek.png";
import Background2 from "../../assets/Background2.png";
import KaosGrafis from "../../assets/Kaosgrafis.png";
import KaosPolos from "../../assets/Kaospolos.png";
import DenimRobek from "../../assets/denimrobek.png";
import ProductScroller from "./Productscroller";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center">
        {/* ubah jadi flex */}
        <div className="flex justify-center items-baseline space-x-2 mb-2 mr-20">
          <p className="italic text-4xl font-georgia">Gaya</p>
          <h1 className="text-8xl font-extrabold uppercase font-impact">
            Thrifting
          </h1>
        </div>
        {/* modern tetap di bawah */}
        <h1 className="text-8xl font-extrabold uppercase font-impact">
          Modern
        </h1>
      </section>

      {/* Showcase Section */}
      <section
        className="relative min-h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${Background2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* overlay (opsional) */}
        <div className="absolute inset-0 bg-white bg-opacity-0 z-0" />

        {/* WRAPPER kotak + card */}
        <div className="relative w-[400px] h-[870px] mx-auto my-12">
          {/* Kotak hitam semi-transparan */}
          <div className="absolute inset-0 bg-black bg-opacity-50 border-2 border-white rounded-lg"></div>

          {/* Scroll‐wrapper: mengisi kotak hitam, sisakan 2rem atas/bawah */}
          <div className="absolute bottom-8 left-0 right-0 overflow-x-auto hide-scrollbar">
            {/* Container fleksibel yang melebar melebihi wrapper */}
            <div
              className="flex space-x-8 pl-4 pr-4 items-start font-playfair font-semibold"
              style={{ width: "calc(100% + 4rem)" }}
            >
              {[
                {
                  title: "Kaos Pendek",
                  brand: "H&M",
                  price: "Rp ??",
                  img: KaosPendek,
                },
                {
                  title: "Kaos Grafis",
                  brand: "ZARA",
                  price: "Rp ??",
                  img: KaosGrafis,
                },
                {
                  title: "Kemeja Polos",
                  brand: "H&M",
                  price: "Rp ??",
                  img: KaosPolos,
                },
                {
                  title: "Denim Robek",
                  brand: "H&M",
                  price: "Rp ??",
                  img: DenimRobek,
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className=" flex-shrink-0 w-45 h-80 bg-white rounded-lg shadow-xl flex flex-col mb-6  p-6 self-start "
                >
                  <img
                    src={p.img}
                    alt={p.title}
                    className="w-[150px] h-[150px] object-contain mb-2 pl-2"
                  />
                  <h4 className=" flex-row font-semibold text-m">{p.title}</h4>
                  <p className="absolute text-[10px] text-gray-500">
                    {p.brand}
                  </p>
                  <div className="mt-auto w-full flex justify-between items-center text-s">
                    <span>{p.price}</span>
                    <button className="text-black-600 hover:underline">
                      + Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      {/* Products Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        {/* Header Produk */}
        <div className="flex items-center justify-between mb-8">
          {/* Grup kiri: Produk + TERBAIK Kami */}
          <div className="flex items-center space-x-4">
            <p className="italic text-base font-georgia">Produk</p>
            <h2 className="text-6xl font-extrabold uppercase flex items-center gap-2 font-impact">
              <span>TERBAIK</span>
              <span className="italic text-base font-normal font-georgia ">
                Kami
              </span>
            </h2>
          </div>

          {/* Tombol kanan */}
          <button
            className="text-sm bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 self-end font-roboto font-bold"
            onClick={() => navigate("/ProductListPage")}
          >
            Lihat Semua
          </button>
        </div>

        <div>
          <ProductScroller />
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-50 relative">
        {/* Container garis outline tengah */}
        <svg
          className="absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 h-full w-[1px] text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 2 100"
          stroke="currentColor"
        >
          <line x1="1" y1="0" x2="1" y2="100" strokeWidth="2" />
        </svg>

        {/* Flex container untuk teks kiri dan kanan */}
        <div className="max-w-4xl mx-auto flex justify-between items-center pl-20">
          <h2 className="text-6xl font-extrabold uppercase whitespace-nowrap pl-10 -ml-10 pt-5 font-impact ">
            35% Off
          </h2>
          <h2 className="text-6xl font-extrabold uppercase whitespace-nowrap pr-20 mr-10 -mb-40 font-impact">
            <span>Only</span>
            <br />
            <span>Today</span>
          </h2>
        </div>

        {/* Container utama untuk SVG dan gambar */}
        <div className="relative mx-auto w-64 h-80 overflow-visible">
          <svg
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[125%] h-[120%] z-0"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,150 L0,60 A100,60 0 0,1 200,60 L200,150"
              fill="none"
              stroke="#373737"
              strokeWidth="1"
            />
          </svg>

          {/* Outer arch background - abu-abu muda */}
          <svg
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[110%] h-[108%] z-0"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 L0,60 A100,60 0 0,1 200,60 L200,200 Z"
              fill="#E4E4E2" // abu-abu muda
            />
          </svg>

          {/* Inner arch background - hijau muda */}
          <svg
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-[110%] h-[95%] z-10 opacity-70"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 L0,60 A100,60 0 0,1 200,60 L200,200 Z"
              fill="#CAE38D" // hijau muda
            />
          </svg>

          {/* Model Image positioned at the bottom dengan bottom-5 */}
          <img
            src={promoModel}
            alt="Model"
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-56 h-[29rem] object-cover z-20"
          />
        </div>

        {/* Tombol CTA */}
        <div className="col-span-1 flex justify-end -mt-2 mr-20 ml-20 ">
          <button className="bg-purple-500 text-black px-6 py-3 rounded-full hover:bg-purple-600 whitespace-nowrap mr-20 ml-20 font-bold font-roboto">
            Ambil Sekarang
          </button>
        </div>
        <div className="text-center max-w-md mx-auto">
          <p className="font-bold text-xl mb-2 font-roboto">
            Subscribe untuk mendapatkan notifikasi
            <br />
            model terbaru dari kami
          </p>
          <form className="inline-flex items-center space-x-2 font-roboto">
            <input
              type="email"
              placeholder="Email kamu......"
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded hover:bg-yellow-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
