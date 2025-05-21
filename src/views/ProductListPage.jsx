import Footer from "../components/layouts/footer.jsx";
import Header from "../components/layouts/navbar.jsx";
import Listproduct from "../components/pages/catalog/listproduct.jsx";


export default function ProductListPage() {
  return (
    <>
      <Header />
      <main className="p-6">
        <Listproduct />
      </main>
      <Footer/>
    </>
  );
}