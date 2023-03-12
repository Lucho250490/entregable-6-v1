import React from 'react'
import { useDispatch } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { addProductCart } from '../../store/slice/cart.slice';

import "./styles/ProductsCart.css"

const ProductsCard = ({product}) => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const handleOnClickProduct = () =>{
    navigate(`/products/${product.id}`)
  }

  const handleNoSelectProduct = (e) => {
    const data = {
      quantity: 1,
      productId:product.id
    }
    e.stopPropagation(e)
    dispatch(addProductCart(data))
  }

  

  return (
    <main className="productCart" onClick={handleOnClickProduct}>
      <header className="productCart__header">
        <div className="productCart__img">
          <img src={product?.images[0].url} alt="" />
          <img src={product?.images[1].url} alt="" />
        </div>
      </header>

      <section className="productCart__info">
        <h4 className="productCart__brand">{product?.brand}</h4>
        <h3 className="productCart__title">{product?.title}</h3>

        <h5 className="productCart__priceTitle">price</h5>

        <h3 className="productCart__price">{product?.price}</h3>

        <button className="productCart__btn" onClick={handleNoSelectProduct}>
          {<i className="bx bxs-cart-download"></i>}
        </button>
      </section>
    </main>
  );
}

export default ProductsCard