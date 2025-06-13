import Header from "../../components/layouts/sidebaradmin.jsx";
import Category from "../../components/pages/admin/categorypage.jsx";
import Navbar from "../../components/layouts/adminnavbar.jsx";

export default function DetailProduk() {
  return (
    <>
      <Header />
            <Navbar />
      <main>
        <Category />
      </main>
    </>
  );
}
