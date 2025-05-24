import Footer from "../components/layouts/footer.jsx";
import Header from "../components/layouts/navbaroff.jsx";
import Home from "../components/pages/main/home.jsx";

export default function Homepage() {
  return (
    <>
      <Header />
      <main className="p-5">
        <Home />
      </main>
      <Footer/>
    </>
  );
}