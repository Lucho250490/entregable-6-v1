import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Purchases from "./pages/Purchases";
import Cart from "./pages/Cart";
import ProtectedUserLogOut from "./components/home/App/ProtectedUserLogOut";
import Navbar from "./components/Layout/Navbar";
import { useEffect } from "react";
import { getAllCartProducts } from "./store/slice/cart.slice";
import { useDispatch, useSelector } from "react-redux";
import AlertAddCart from "./components/home/App/AlertAddCart";

function App() {
  const { token } = useSelector((store) => store.userInfo);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getAllCartProducts());
    }
  }, [token]);
  return (
    <div className="App">
      <Navbar />
      <AlertAddCart />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedUserLogOut />}>
          <Route path="/products/:id" element={<Products />} />
          <Route path="/purchases" element={<Purchases />} />

          {            
            <Route className="cart" path="/cart" element={<Cart />} />            
          }
        </Route>
      </Routes>
    </div>
  );
}

export default App;
