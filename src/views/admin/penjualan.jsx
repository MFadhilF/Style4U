import Header from "../../components/layouts/sidebaradmin.jsx";
import Penjualan from "../../components/pages/admin/penjualanpage.jsx";
import Navbar from "../../components/layouts/adminnavbar.jsx";

export default function DetailProduk() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Penjualan />
      </main>
    </>
  );
}
