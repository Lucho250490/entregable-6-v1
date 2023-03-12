import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductsCard from "../components/home/ProductsCard";
import { axiosEcomerce } from "../utils/axiosConfig";

import "./styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [nameFilter, setNameFilter] = useState("");
  const [productFilter, setProdutsFilter] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState(0);
 

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameProduct = e.target.nameProduct.value;
    setNameFilter(nameProduct);
    
  };

  

  useEffect(() => {
    axiosEcomerce
      .get("/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axiosEcomerce
      .get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const newProductByName = products.filter((product) =>
      product.title.toLowerCase().includes(nameFilter.toLowerCase())
    );
 
    if (categoryFilter) {
      const newProductByCategory = newProductByName.filter(
        (product) => product.categoryId === categoryFilter
      );
      setProdutsFilter(newProductByCategory);
    } else {
      setProdutsFilter(newProductByName);
    }
  }, [nameFilter, products, categoryFilter]);

  return (
    <main className="home">
      <form className="home__form" onSubmit={handleSubmit} action="">
        <div className="home__form-search">
          <input
            className="home__form-searchInput"
            id="nameProduct"
            type="text"
            placeholder="What are you looking for?"
          ></input>
          <button className="home__form-button">
            <i className="bx bx-search-alt home__form-icon"></i>
          </button>
        </div>

        <div className="home__form-filter" id="home__form-filte">
          <h3 className="home__form-filter-title">Categories</h3>

          <ul
            className="home__form-filter-categories"
            id="nameProduct"
          >
            <li
              className="home__category-select"
              href="#"
              id="active"
              onClick={() => setCategoryFilter(0)}
            >
              All
            </li>
            {categories.map((category) => (
              <li
                onClick={() => setCategoryFilter(category.id)}
                key={category.id}
                id="active"
                className="home__category-select"
              >
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </form>
      <section className="home_listProducts">
        {productFilter.map((product) => (
          <ProductsCard key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Home;
