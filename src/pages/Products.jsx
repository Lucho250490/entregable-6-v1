import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductsCard from "../components/home/ProductsCard";
import { addProductCart } from "../store/slice/cart.slice";
import { axiosEcomerce } from "../utils/axiosConfig";
import "./styles/Products.css";

const Products = () => {
  const positionSlider = ["zero", "one", "two"];
  const { id } = useParams();

  const [product, setProduct] = useState();
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);

  const [sliderImg, setSliderImg] = useState(0);


  const dispatch = useDispatch();

  const {error}= useSelector(store=>store.cart)

  const handleSlideNext = ()=> {
    const newSliderImg = sliderImg + 1
    if (newSliderImg > positionSlider.length -1){
      setSliderImg(0);
    }else{
      setSliderImg(newSliderImg);
    } ;
  }

  const handleSlidePrevius = () => {
    const newSliderImg = sliderImg - 1
    if(newSliderImg < 0){
      setSliderImg(positionSlider.length -1)
    }else{
      setSliderImg(newSliderImg)
    }
  }

  const handleLess = () => {
    const newQuantity = quantity - 1;
    if (quantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handlPluss = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
  };

  const handleAddProductsToCart = () => {
    const data = {
      quantity,
      productId: product?.id,
    };

    dispatch(addProductCart(data));
  };

  useEffect(() => {
    axiosEcomerce
      .get(`/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (product) {
      axiosEcomerce
        .get(`/products?categoryId=${product?.categoryId}`)
        .then((res) => {
          const newSimilarProduct = res.data.filter(
            (productByCategory) => productByCategory.id !== product.id
          );

          setSimilarProducts(newSimilarProduct);
        })
        .catch((err) => console.log(err));
    }
  }, [product]);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  return (
    <main className={`product ${error? "active": ""}`}>
      <section className="product__details">
        {/*  imag product */}

        <section className="product__details-slider">
          <section
            className={`product__details-imgContainer ${positionSlider[sliderImg]} `}
          >
            <div className="product__details-img">
              <img src={product?.images[0].url} alt="" />
            </div>

            <div className="product__details-img">
              <img src={product?.images[1].url} alt="" />
            </div>

            <div className="product__details-img">
              <img src={product?.images[2].url} alt="" />
            </div>
          </section>

          <i onClick={handleSlideNext} className="bx bxs-right-arrow-alt next"></i>
          <i onClick={handleSlidePrevius} className="bx bxs-left-arrow-alt previus"></i>
        </section>

        {/* Buy */}

        <section className="product__details-infoContainer">
          <h4 className="product__details-brand">{product?.brand}</h4>
          <h3 className="product__details-title">{product?.title}</h3>

          <div className="product__details-quantityInter">
            <div className="product__details-quantityContainer">
              <h4 className="product__details-priceTitle">Price</h4>
              <h3 className="product__details-price">{product?.price}</h3>
            </div>
            <div className="product__details-quantity">
              <h4 className="product__details-quantityTitle">Quantity</h4>
              <div className="product__details-counter">
                <button onClick={handleLess}>-</button>
                <h4>{quantity}</h4>
                <button onClick={handlPluss}>+</button>
              </div>
            </div>
          </div>

          <button
            className="product__details-btn"
            onClick={handleAddProductsToCart}
          >
            {" "}
            Add to cart{" "}
          </button>
          <p className="product__details-text">{product?.description}</p>
        </section>

        {/* Description */}

        <h2 className="product__details-titleSimilar">
          Discover similar items
        </h2>

        <section className="product__details-similarItems">
          {similarProducts.map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </section>
      </section>
    </main>
  );
};

export default Products;
