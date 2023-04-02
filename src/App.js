import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import Login from "./pages/Login"
import Navbar from "./components/Navbar";
import ProductDetail from './pages/ProductDetail'
import Footer from "./components/Footer";

function App() {

  const [keyword, setKeyword] = useState('')

  return (
    <>
      <Router>
        <Navbar keyword={keyword} setKeyword={setKeyword} />
        <Routes>
          <Route path={''} element={<Home search={keyword} />} />
          <Route path={'/login'} element={<Login />} />
          <Route path={'/product/:id'} element={<ProductDetail />} />
          <Route path={'*'} element={<Home search={keyword} />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
