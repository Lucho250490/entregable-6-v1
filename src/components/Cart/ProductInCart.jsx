import React from "react";
import { useDispatch } from "react-redux";
import {
  deleteProductCart,
  updateProductCart,
} from "../../store/slice/cart.slice";

import "./styles/ProductCart.css"
const ProductInCart = ({ product }) => {
  const dispatch = useDispatch();

  const handleDeleteProductCar = () => {
    dispatch(deleteProductCart(product.id));
  };

  const handleClickPlus = () => {
    const newQuantity = product.quantity + 1;
    const data = {
      quantity: newQuantity,
    };

    dispatch(updateProductCart(product.id, data));
  };

  const handleClickLess = () => {
    const newQuantity = product.quantity - 1;
    if (newQuantity <= 0) {
      dispatch(deleteProductCart(product.id));
    } else {
      const data = {
        quantity: newQuantity,
      };
      dispatch(updateProductCart(product.id, data));
    }
  };

  return (
    <article className="article">
      <div className="img">
        <img src={product.product.images[0].url} alt="" />
      </div>

      <section className="section-btns">
        <h3>{product.product.title}</h3>

        <div className="btns">
          <button onClick={handleClickLess}>-</button>
          <h4>{product.quantity}</h4>
          <button onClick={handleClickPlus}>+</button>
        </div>
      </section>

      <section className="section-price">
        <div className="tr">
          <i className="bx bx-trash " onClick={handleDeleteProductCar}></i>
        </div>
        <h3>Total</h3>
        <h4>$ {product.product.price * product.quantity}</h4>
      </section>
    </article>
  );
};

export default ProductInCart;
