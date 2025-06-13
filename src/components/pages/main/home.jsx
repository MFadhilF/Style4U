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
        <div className="flex flex-col sm:flex-row justify-center items-center sm:items-baseline sm:space-x-2 mb-2">
          <p className="italic text-3xl sm:text-4xl font-georgia">Gaya</p>
          <h1 className="text-5xl sm:text-8xl font-extrabold uppercase font-impact">
            Thrifting
          </h1>
        </div>
        <h1 className="text-5xl sm:text-8xl font-extrabold uppercase font-impact">
          Modern
        </h1>
      </section>

      <section
        className="relative min-h-[70vh] sm:min-h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${Background2})`,
        }}
      >
        <div className="absolute inset-0 bg-white bg-opacity-0 z-0" />
        <div className="relative w-full max-w-md sm:w-[400px] min-h-[60vh] sm:min-h-[80vh] mx-auto my-12">
          <div className="absolute inset-0 bg-black bg-opacity-50 border-2 border-white rounded-lg"></div>
          <div className="absolute bottom-8 left-0 right-0 overflow-x-auto hide-scrollbar">
            {/* Hapus 'items-start' dari sini agar defaultnya menjadi 'stretch' */}
            <div className="flex space-x-4 sm:space-x-6 md:space-x-8 px-4 font-playfair font-semibold w-max py-2">
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
                  className="flex-shrink-0 
                 w-40 sm:w-48 md:w-56 lg:w-64 
                 bg-white rounded-lg 
                 shadow-lg hover:shadow-xl 
                 flex flex-col 
                 h-full {/* h-full akan bekerja dengan baik jika parentnya items-stretch */}
                 mb-6 
                 p-3 sm:p-4 
                 text-left 
                 transition-shadow duration-200 ease-in-out"
                >
                  {/* IMAGE CONTAINER */}
                  <div className="relative bg-gray-100 rounded-md p-2 sm:p-3 mb-2 sm:mb-3 aspect-square flex items-center justify-center">
                    <p className="absolute top-1.5 left-1.5 text-[10px] sm:text-xs text-gray-500 font-playfair uppercase z-10">
                      {p.brand}
                    </p>
                    <img
                      src={p.img}
                      alt={p.title}
                      className="max-w-full max-h-full object-contain rounded"
                    />
                  </div>
                  {/* INFO PRODUK */}
                  <h4
                    className="text-sm sm:text-base font-semibold mb-0.5 truncate"
                    title={p.title}
                  >
                    {p.title}
                  </h4>
                  {/* mt-auto akan mendorong blok ini ke bawah jika ada ruang ekstra karena h-full dan parent items-stretch */}
                  <div className="mt-auto w-full flex justify-between items-center text-xs sm:text-sm font-playfair pt-2">
                    <span>{p.price}</span>
                    <button className="text-gray-700 hover:underline font-semibold">
                      + Keranjang
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  gap-4">
          <div className="flex items-center space-x-2">
            <p className="italic text-sm sm:text-base font-georgia">Produk</p>
            <h2 className="text-3xl sm:text-6xl font-extrabold uppercase flex items-center gap-2 font-impact">
              <span>TERBAIK</span>
              <span className="italic text-base font-normal font-georgia">
                Kami
              </span>
            </h2>
          </div>
          <button
            className="text-xs sm:text-sm bg-yellow-400 text-black px-4 py-2 rounded-full hover:bg-yellow-500 font-roboto font-bold"
            onClick={() => navigate("/ProductListPage")}
          >
            Lihat Semua
          </button>
        </div>
        <ProductScroller />
      </section>

      <section className="py-10 px-4 bg-gray-50 relative">
        {/* Ini adalah SVG garis vertikal Anda, posisinya absolut dan tidak terpengaruh */}
        <svg
          className="hidden sm:block absolute top-0 bottom-0 left-1/2 transform -translate-x-1/2 h-full w-[1px] text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 2 100"
          stroke="currentColor"
        >
          <line x1="1" y1="0" x2="1" y2="100" strokeWidth="2" />
        </svg>

        {/* Kontainer utama untuk teks, menggunakan flex-row */}
        <div className="max-w-4xl flex flex-row mx-auto justify-between items-center sm:pl-20 text-center sm:text-left relative top-20">
          <div>
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase pt-5 font-impact ml-3 sm:mt-0 ">
              35% Off
            </h2>
          </div>

          <div className="relative top-24 right-14 sm:mr-20 ">
            <h2 className="text-4xl sm:text-6xl font-extrabold uppercase font-impact flex flex-col items-center sm:items-start">
              <span>Only</span>
              <span>Today</span>
            </h2>
          </div>
        </div>

        <div className="relative mx-auto w-64 h-72 sm:w-64 sm:h-80 mt-10 sm:mt-0">
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
          <svg
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[110%] h-[108%] z-0"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 L0,60 A100,60 0 0,1 200,60 L200,200 Z"
              fill="#E4E4E2"
            />
          </svg>
          <svg
            className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-[110%] h-[95%] z-10 opacity-70"
            viewBox="0 0 200 200"
            preserveAspectRatio="none"
          >
            <path
              d="M0,200 L0,60 A100,60 0 0,1 200,60 L200,200 Z"
              fill="#CAE38D"
            />
          </svg>
          <img
            src={promoModel}
            alt="Model"
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-40 sm:w-56 h-[23rem] sm:h-[29rem] object-cover z-20"
          />
        </div>

        <div className="flex justify-center sm:justify-end sm:mr-20 relative right-48">
          <button className="bg-purple-500 text-black px-6 py-3 rounded-full hover:bg-purple-600 font-bold font-roboto">
            Ambil Sekarang
          </button>
        </div>

        <div className="text-center max-w-md mx-auto mt-8">
          <p className="font-bold text-lg sm:text-xl mb-2 font-roboto">
            Subscribe untuk mendapatkan notifikasi
            <br />
            model terbaru dari kami
          </p>
          <form className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2 font-roboto">
            <input
              type="email"
              placeholder="Email kamu......"
              className="border border-gray-300 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-full"
            />
            <button
              type="submit"
              className="bg-yellow-400 text-black font-semibold px-4 py-1 rounded hover:bg-yellow-300 w-full sm:w-auto"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
