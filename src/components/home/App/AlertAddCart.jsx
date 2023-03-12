import React from 'react'
import { useSelector } from 'react-redux';
import "./styles/AlertAddCart.css"



const AlertAddCart = () => {

  const { error } = useSelector((store) => store.cart);

  return (
    <article className={`alertAddToCart ${ error? "active": ""}`}>
      <div>
        <h3 className="alertAddToCart__text ">Product already added to cart</h3>
      </div>
    </article>
  );
}

export default AlertAddCart