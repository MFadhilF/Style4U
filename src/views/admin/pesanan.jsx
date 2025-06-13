import Header from "../../components/layouts/sidebaradmin.jsx";
import Pesanan from "../../components/pages/admin/pesananpage.jsx";
import Navbar from "../../components/layouts/adminnavbar.jsx";

export default function DetailProduk() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Pesanan />
      </main>
    </>
  );
}
