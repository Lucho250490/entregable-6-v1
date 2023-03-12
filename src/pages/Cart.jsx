import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductInCart from "../components/Cart/ProductInCart";
import { getAllCartProducts, purchaseCart } from "../store/slice/cart.slice";

import "./styles/Cart.css"

const Cart = () => {
  const { products } = useSelector((store) => store.cart);
  console.log(products);

  const handlePurchaseCart = ()=> {
    dispatch(purchaseCart())
  }

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCartProducts());
  }, []);

  const totalPriceCart = products.reduce(
    (total, product)=> total + product.quantity*product.product.price, 0
  )

  return (
    <main className="mainProductCart">
      <section className="ProductCart">
        {products.map((product) => (
          <ProductInCart product={product} key={product.id} />
        ))}
      </section>

      <hr className="line"></hr>

      <section className="ProductCart__priceCart">
        <div className="ProductCart__total">
          <h3 className="ProductCart__total-title">Total</h3>
          <h3 className="ProductCart__total-price">$ {totalPriceCart}</h3>
        </div>

        <button className="ProductCart__total-btn" onClick={handlePurchaseCart}>
          Checkout
        </button>
      </section>
    </main>
  );
};

export default Cart;
