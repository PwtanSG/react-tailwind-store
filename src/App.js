import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductDetail from './pages/ProductDetail'
import Footer from "./components/Footer";

function App() {

  const APP_PATH = process.env.REACT_APP_PATH

  return (
    <>
      <Router>
        <Navbar />
        {/* <Routes>
          <Route path={APP_PATH} element={<Home />} />
          <Route path={`${APP_PATH}/product/:id`} element={<ProductDetail />} />
        </Routes> */}
        <Footer />
      </Router>
    </>
  );
}

export default App;
