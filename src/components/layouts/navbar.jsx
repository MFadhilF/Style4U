import { Search, ShoppingCart, ClipboardList, User } from "lucide-react";
import style4ulogo from "../../components/assets/style4u-logo.png"; // Pastikan path ini benar
import cartlogo from "../../components/assets/cart-logo.png";      // Pastikan path ini benar
import bookmarklogo from "../../components/assets/bookmark-logo.png"; // Pastikan path ini benar
import accountlogo from "../../components/assets/account-logo.png";  // Pastikan path ini benar
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  // Fungsi untuk navigasi ke halaman daftar produk
  const goToProductListPage = () => {
    navigate("/productlistpage"); // Ganti "/productlistpage" dengan path aktual ke halaman daftar produk Anda
  };

  const goToWishlist = () => {
    navigate("/profile/wishlist"); // Path ini sudah benar sesuai permintaan
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 shadow-md bg-white">
      {/* Kiri: Logo */}
      <div
        className="flex items-center gap-3 cursor-pointer" // Menambahkan cursor-pointer
        onClick={goToProductListPage} // Menambahkan onClick handler
      >
        <img src={style4ulogo} alt="Logo Style4U" className="h-10 w-auto" />
        {/* Div kosong ini bisa dihapus jika tidak ada teks di samping logo */}
        {/* <div className="text-left text-sm leading-tight"></div> */}
      </div>

      {/* Tengah: Search bar */}
      <div className="relative w-1/2 max-w-xl">
        <input
          type="text"
          placeholder="Cari"
          className="w-full rounded-full border border-black py-2 px-4 text-center text-sm font-semibold placeholder:text-center placeholder:font-semibold focus:outline-none focus:placeholder-transparent"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B5E3C] h-5 w-5" />
      </div>

      {/* Kanan: Icons */}
      <div className="flex items-center gap-6 text-black">
        <button className="cursor-pointer" onClick={() => navigate("/keranjang")}> {/* Contoh navigasi untuk cart */}
          <img src={cartlogo} alt="Keranjang" className="h-6 w-auto" />
        </button>
        {/* MODIFIED PART HERE: Menggunakan fungsi goToWishlist */}
        <button className="cursor-pointer" onClick={goToWishlist}>
          <img src={bookmarklogo} alt="Wishlist" className="h-6 w-auto" />
        </button>
        <button onClick={() => navigate("/profile")} className="cursor-pointer">
          <img src={accountlogo} alt="Akun" className="h-6 w-auto" />
        </button>
      </div>
    </header>
  );
}