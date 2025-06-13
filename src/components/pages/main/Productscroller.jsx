import React, { useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import KaosGrafis from "../../assets/Kaosgrafis.png"; 
import BajuVintage from "../../assets/Bajuvintage.png"; 
import KaosPolos from "../../assets/Kaospolos.png";   
import DenimRobek from "../../assets/denimrobek.png"; 


export default function Productscroller() {
  const scroller = useRef(null);

  const initialProductData = [
    {
      id: 1,
      title: "Baju Vintage 90's",
      price: "Rp 150.000",
      grade: "Grade A",
      img: BajuVintage,
      brand: 'Zara',     
      gender: 'women',  
      isFavorite: false,
    },
    {
      id: 2,
      title: "Kaos American Style",
      price: "Rp 72.000",
      grade: "Grade A",
      img: KaosGrafis,
      brand: 'H&M',      
      gender: 'men',     
      isFavorite: true, 
    },
    {
      id: 3,
      title: "Kemeja / Blouse",
      price: "Rp 72.000",
      grade: "Grade A",
      img: KaosPolos,    
      brand: 'Uniqlo',   
      gender: 'women',   
      isFavorite: false,
    },
    {
      id: 4,
      title: "Denim Robek",
      price: "Rp 120.000",
      grade: "Grade A",
      img: DenimRobek,
      brand: 'Levi\'s', 
      gender: 'men',     
      isFavorite: false,
    },
  ];

  const [products, setProducts] = useState(initialProductData);

  const scroll = (distance) => {
    if (scroller.current) {
      scroller.current.scrollBy({ left: distance, behavior: 'smooth' });
    }
  };

  const handleCardClick = (product) => {
    console.log("Card clicked:", product.title);
  };

  const handleToggleFavorite = (productId, event) => {
    event.stopPropagation(); 
    setProducts(currentProducts =>
      currentProducts.map(p =>
        p.id === productId ? { ...p, isFavorite: !p.isFavorite } : p
      )
    );
  };
  
  const handleFavoriteKeyDown = (productId, event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      event.stopPropagation();
      handleToggleFavorite(productId, event);
    }
  };

  return (
    <div className="relative max-w-full sm:max-w-6xl mx-auto py-8 px-0 sm:px-4">
      <button
        onClick={() => scroll(-250)}
        className="absolute left-1 sm:-left-4 md:-left-6 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg text-xl sm:text-2xl font-bold flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors"
        aria-label="Scroll left"
      >
        ‹
      </button>
      <button
        onClick={() => scroll(250)}
        className="absolute right-1 sm:-right-4 md:-right-6 top-1/2 transform -translate-y-1/2 z-30 bg-white p-2 rounded-full shadow-lg text-xl sm:text-2xl font-bold flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 hover:bg-gray-100 transition-colors"
        aria-label="Scroll right"
      >
        ›
      </button>

      <div
        ref={scroller}
        className="overflow-x-auto hide-scrollbar scroll-smooth px-4 sm:px-8 md:px-10"
      >
        <div className="flex space-x-4 sm:space-x-6 md:space-x-8 py-2">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => handleCardClick(p)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleCardClick(p);}}}
              aria-label={`Lihat detail untuk ${p.title}`}
              className="relative group flex-shrink-0 w-40 sm:w-48 md:w-56 lg:w-64 bg-white rounded-lg shadow-lg hover:shadow-xl p-3 sm:p-4 text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-200 ease-in-out cursor-pointer"
            >
              <div className="relative bg-gray-100 rounded-md p-2 sm:p-3 mb-2 sm:mb-3 aspect-square flex items-center justify-center">
                <span className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 text-[9px] sm:text-[10px] uppercase text-gray-500 z-20 font-sans">
                  {p.brand} 
                </span>
                
                <img
                  src={p.img}
                  alt={p.title}
                  className="max-w-full max-h-full object-contain rounded group-hover:scale-105 transition-transform duration-200"
                />

                <button
                  onClick={(e) => handleToggleFavorite(p.id, e)}
                  onKeyDown={(e) => handleFavoriteKeyDown(p.id, e)}
                  className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 z-20 p-1 sm:p-1.5 rounded-full  transition-colors"
                  aria-pressed={p.isFavorite}
                  aria-label={p.isFavorite ? `Hapus ${p.title} dari favorit` : `Tambah ${p.title} ke favorit`}
                >
                  <Heart
                    className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-150 ease-in-out ${
                      p.isFavorite 
                        ? 'text-red-500 fill-red-500' 
                        : 'text-gray-400 fill-none' 
                    }`}
                  />
                </button>
              </div>
              
              <div className="mt-2 sm:mt-3">
                <div className="flex items-baseline mb-1">
                  <h3 className="font-semibold font-playfair text-sm sm:text-base md:text-md truncate mr-2" title={p.title}> 
                    {p.title}
                  </h3>
                  <span className="text-[10px] sm:text-xs text-gray-500 font-playfair flex-shrink-0 whitespace-nowrap">
                    {p.gender} 
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs sm:text-sm font-playfair mt-1">
                  <span className="font-semibold text-gray-800">{p.price}</span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-semibold">{p.grade}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}