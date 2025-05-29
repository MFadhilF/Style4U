
import React, { useRef } from 'react';
import KaosGrafis from "../../assets/Kaosgrafis.png";
import BajuVintage from "../../assets/Bajuvintage.png";
import KaosPolos from "../../assets/Kaospolos.png";
import DenimRobek from "../../assets/denimrobek.png";


export default function Productscroller() {
  const scroller = useRef(null);

  const products = [
    {
      title: "Baju Vintage 90's",
      price: "Rp 150.000",
      grade: "Grade A",
      img: BajuVintage,
    },
    {
      title: "Kaos American Style",
      price: "Rp 72.000",
      grade: "Grade A",
      img: KaosGrafis,
    },
    {
      title: "Kemeja / Blouse",
      price: "Rp 72.000",
      grade: "Grade A",
      img: KaosPolos,
    },
    {
      title: "Denim Robek",
      price: "Rp 120.000",
      grade: "Grade A",
      img: DenimRobek,
    },
  ];

  const scroll = (distance) => {
    if (scroller.current) {
      scroller.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative max-w-6xl mx-auto py-8 px-4">
      {/* Tombol kiri */}
      <button
        onClick={() => scroll(-300)}
        className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg"
      >
        ‹
      </button>

      {/* Tombol kanan */}
      <button
        onClick={() => scroll(300)}
        className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-20 bg-white p-2 rounded-full shadow-lg"
      >
        ›
      </button>

      {/* Scrollable container */}
      <div
        ref={scroller}
        className="overflow-x-auto hide-scrollbar scroll-smooth"
        style={{ padding: '0 2rem' }}
      >
        <div className="flex space-x-10">
          {products.map((p, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-64 bg-white rounded-lg shadow-xl p-4 text-center"
            >
              <div className="bg-gray-100 rounded-lg p-4 mb-4">
                <img
                  src={p.img}
                  alt={p.title}
                  className="mx-auto w-40 h-40 object-contain rounded"
                />
              </div>
              <h3 className="flex row font-semibold mb-1 font-playfair">{p.title}</h3>
              <p className=" flex row justify-between text-black-700 text-sm mb-1 font-playfair font-semibold">{p.price}
                  <p className="flex row text-black-500 text-s mb-2 font-playfair font-semibold">{p.grade}</p>
              </p>
            
              <button className="text-blue-600 hover:underline">Lihat</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
