import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login"
import Navbar from "./components/Navbar";
import ProductDetail from './pages/ProductDetail'
import Footer from "./components/Footer";

function App() {

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path={''} element={<Home />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/product/:id'} element={<ProductDetail />} />
          <Route path={'*'} element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
