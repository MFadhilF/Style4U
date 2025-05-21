import Header from "../components/layouts/navbar.jsx";
import Detail from "../components/pages/product/detail/header-detail.jsx";
import DeskripsiDetail from "../components/pages/product/detail/deskripsi-detail.jsx";
import RekomendasiDetail from "../components/pages/product/detail/rekomendasi-detail.jsx";
import Footer from "../components/layouts/footer";


export default function DetailProduk() {
  return (
    <>
      <Header />
      <main className="p-6">
        <Detail />
        <div className="mt-10 w-full h-[2px] bg-[#000000]"></div>
        <DeskripsiDetail />
        <div className="mt-10 w-full h-[2px] bg-[#000000]"></div>
        <RekomendasiDetail />
      </main>
      <Footer/>
    </>
  );
}
//sdasdwa