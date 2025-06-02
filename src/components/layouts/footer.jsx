import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#CAE38D]/70 text-black-900 py-8">
      <div className="container mx-auto px-4">
        {/* Grid layout: 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
          {/* Left: Tagline */}
          <div className="text-left">
            <h2 className="text-2xl font-light">Good Quality</h2>
            <h2 className="text-2xl font-light">Good Style For U</h2>
          </div>

          {/* Center: Link groups */}
          <div className="flex justify-center">
            <div className="flex flex-col sm:flex-row sm:space-x-16 space-y-6 sm:space-y-0 ">
              {/* Produk */}
              <div>
                <h3 className="text-lg font-medium mb-2">Produk</h3>
                <div className="space-y-2">
                  <button className="block text-left hover:underline">Vintage</button>
                  <button className="block text-left hover:underline">Skena</button>
                  <button className="block text-left hover:underline">Korean style</button>
                  <button className="block text-left hover:underline">Minimalist</button>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h3 className="text-lg font-medium mb-2">Brand</h3>
                <div className="space-y-2">
                  <button className="block text-left hover:underline">Zara</button>
                  <button className="block text-left hover:underline">Uniqlo</button>
                  <button className="block text-left hover:underline">H&M style</button>
                </div>
              </div>

              {/* Metode Pembayaran */}
              <div>
                <h3 className="text-lg font-medium mb-2">Metode Pembayaran</h3>
                <p>Transfer</p>
                <p>Virtual Account</p>
                <p>QRIS</p>
              </div>
            </div>
          </div>

          {/* Right: empty placeholder for balancing layout */}
          <div />
        </div>

        <hr className="my-6 border-green-300" />

        {/* Copyright */}
        <div className="text-center text-sm">
          <span>Copyright</span>
          <span className="mx-2">|</span>
          <span>by Style For You 2025</span>
        </div>
      </div>
    </footer>
  );
}