import Header from "../../components/layouts/sidebaradmin.jsx";
import Navbar from "../../components/layouts/adminnavbar.jsx";
import Users from "../../components/pages/admin/userspage.jsx";

export default function DetailProduk() {
  return (
    <>
      <Header />
      <Navbar />
      <main className="p-6">
        <Users />
      </main>
    </>
  );
}
