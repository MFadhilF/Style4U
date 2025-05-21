// src/Filtertabs.jsx
import React, { useState } from 'react';
import ProductCard from "./productcard.jsx";
import Banner from "./banner.jsx";
import BajuVintage from "../../assets/Bajuvintage.png";
import BajuRajut from "../../assets/Bajurajut.png";
import JaketDenim from "../../assets/jaket-denim.png";
import JeansLukis from "../../assets/jeans-lukis.png";
import KemejaBunga from "../../assets/kemeja-bunga.png";
import DenimRobek from "../../assets/Denimrobek.png";
import JaketKulit from "../../assets/jaket-kulit.png";
import KaosGrafis from "../../assets/Kaosgrafis.png";
import KaosPolos from "../../assets/Kaospolos.png";
import Batik from "../../assets/batik.png";
import Sweater from "../../assets/Sweater.png";

const categories = ['all', 'vintage', 'minimalist', 'coquette', 'skena'];

export const initialProducts = [
  { id: 1,  name: 'Baju Vintage 90’s',  price: '70.000',  category: 'vintage',   grade: 'B', img: BajuVintage,    isFavorite: false },
  { id: 2,  name: 'Oversize Rajut',     price: '80.000',  category: 'minimalist',grade: 'B', img: BajuRajut, isFavorite: false },
  { id: 3,  name: 'Jaket Denim',        price: '150.000', category: 'skena',     grade: 'C', img: JaketDenim,    isFavorite: false },
  { id: 4,  name: 'Jeans Lukis',        price: '80.000',  category: 'skena',     grade: 'A', img: JeansLukis,    isFavorite: false },
  { id: 5,  name: 'Kemeja Bunga',       price: '50.000',  category: 'vintage',   grade: 'A', img: KemejaBunga,   isFavorite: false },
  { id: 6,  name: 'Denim Robek',        price: '95.000',  category: 'minimalist',grade: 'A', img: DenimRobek,    isFavorite: false },
  { id: 7,  name: 'Jaket Kulit',        price: '125.000', category: 'skena',     grade: 'A', img: JaketKulit,    isFavorite: false },
  { id: 8,  name: 'Kaos Grafis',        price: '25.000',  category: 'coquette',  grade: 'B', img: KaosGrafis,    isFavorite: false },
  { id: 9,  name: 'Kaos Polos',       price: '30.000',  category: 'minimalist',grade: 'B', img: KaosPolos,  isFavorite: false },
  { id: 10, name: 'Batik',              price: '20.000',  category: 'vintage',   grade: 'B', img: Batik,         isFavorite: false },
  { id: 11, name: 'Sweater',            price: '15.000',  category: 'minimalist',grade: 'C', img: Sweater,       isFavorite: false },
  { id: 12, name: 'Kemeja Polos',       price: '20.000',  category: 'coquette',  grade: 'C', img: KaosPolos,  isFavorite: false },
];

export default function ListProduct() {
  const [activeCat, setActiveCat] = useState('all');
  const [products, setProducts] = useState(initialProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 12;

  // toggle favorite
  const handleToggleFav = id => {
    setProducts(prev =>
      prev.map(p =>
        p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };

  // filter & paginate
  const filtered = activeCat === 'all'
    ? products
    : products.filter(p => p.category === activeCat);

  const totalPages = Math.ceil(filtered.length / perPage);
  const startIdx = (currentPage - 1) * perPage;
  const pagedProducts = filtered.slice(startIdx, startIdx + perPage);

  const goToPage = n => {
    setCurrentPage(Math.min(Math.max(n, 1), totalPages));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="p-6">
        <Banner />
      {/* FILTER TABS */}
      <ul className="flex space-x-2 mb-6 font-playfair">
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => { setActiveCat(cat); setCurrentPage(1); }}
              className={`
                px-4 py-2 rounded-full border
                hover:bg-gray-100 focus:outline-none transition
                ${activeCat === cat
                  ? 'bg-yellow-300 border-yellow-300'
                  : 'border-gray-300'}
              `}
            >
              {cat === 'all'
                ? 'Semua'
                : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          </li>
        ))}
      </ul>

      {/* PRODUCT GRID */}
      <div className="flex flex-wrap -mx-4 gap-y-6">
        {pagedProducts.map(p => (
          <div key={p.id} className="px-6 mb-4">
            <ProductCard
              product={p}
              onToggleFavorite={handleToggleFav}
            />
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-8 space-x-2 text-gray-700 font-playfair">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50 font-playfair"
          >
            Sebelumnya
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i+1)}
              className={`
                px-3 py-1 rounded
                ${currentPage === i+1 ? 'bg-gray-300 font-semibold' : 'hover:bg-gray-100 font-playfair'}
              `}
            >
              {i+1}
            </button>
          ))}
          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 rounded hover:bg-gray-100 disabled:opacity-50 font-playfair"
          >
            Selanjutnya
          </button>
        </div>
      )}
    </div>
  );
}
