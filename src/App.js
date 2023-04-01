import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from './components/ProductDetail'
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
