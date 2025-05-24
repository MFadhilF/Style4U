import Navbar from "../components/layouts/navbar.jsx";
import Lebihlanjut from "../components/pages/product/lebihlanjut/header-lebihlanjut.jsx";
import RekomendasiDetail from "../components/pages/product/detail/rekomendasi-detail.jsx";

export default function DetailProduk() {
  return (
    <>
      <Navbar />
      <main ></main>
      <Lebihlanjut />
      <div className="mt-10 w-full h-[2px] bg-[#000000]"></div>
      <RekomendasiDetail />
    </>
  );
}
