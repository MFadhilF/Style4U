import Header from "../../components/layouts/sidebaradmin.jsx";
import Dashboard from "../../components/pages/admin/dashboardpage.jsx";
import Navbar from "../../components/layouts/adminnavbar.jsx";

export default function DetailProduk() {
  return (
    <>
      <Header />
      <Navbar />
      <main>
        <Dashboard />
      </main>
    </>
  );
}
