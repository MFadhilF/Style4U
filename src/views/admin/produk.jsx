import Header from "../../components/layouts/sidebaradmin.jsx";
import Produk from "../../components/pages/admin/produkpage.jsx";
import Navbar from "../../components/layouts/adminnavbar.jsx";

export default function DetailProduk() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Produk />
      </main>
    </>
  );
}
