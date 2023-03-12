import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosEcomerce, getConfig } from "../../utils/axiosConfig";

const initialState = {
  products: [],
  error: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setChangeProductCartGlobal: (state, action) => {
      return { ...state, products: action.payload };
    },
    setChangeErrorAddToCart: (state) => {
      return { ...state, error: !state.error };
    },
  },
});

export const { setChangeProductCartGlobal, setChangeErrorAddToCart } =
  cartSlice.actions;

export const getAllCartProducts = () => (dispatch) => {
  axiosEcomerce
    .get("/cart", getConfig())
    .then((res) => dispatch(setChangeProductCartGlobal(res.data)))
    .catch((err) => console.log(err));
};
export default cartSlice.reducer;

export const addProductCart = (data) => (dispatch) => {
  axiosEcomerce
    .post("/cart", data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => {
      console.log(err);
      if (err.response.data?.error === "Product already added to cart") {
        dispatch(setChangeErrorAddToCart());
        setTimeout(()=>{
          dispatch(setChangeErrorAddToCart())
        },2000)
      }
    });
};

export const deleteProductCart = (id) => (dispatch) => {
  axiosEcomerce
    .delete(`/cart/${id}`, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err));
};

export const updateProductCart = (id, data) => (dispatch) => {
  axiosEcomerce
    .put(`/cart/${id}`, data, getConfig())
    .then((res) => dispatch(getAllCartProducts()))
    .catch((err) => console.log(err));
};

export const purchaseCart = () => (dispatch) => {
  axiosEcomerce
    .post("/purchases", {}, getConfig())
    .then((res) => dispatch(setChangeProductCartGlobal([])))
    .catch((err) => console.log(err));
};
