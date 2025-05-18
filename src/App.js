// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetailProduk from "./views/detailproduk";
import Home from "./App.jsx"; // ini merujuk ke Home yang ada di App.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detailproduk" element={<DetailProduk />} />
      </Routes>
    </Router>
  );
}

export default App;
