// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailProduk from "./views/detailproduk";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/detailproduk" element={<DetailProduk />} />
        {/* Tambahkan route lain di sini jika diperlukan */}
      </Routes>
    </Router>
  );
}

export default App;
