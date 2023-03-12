import { createSlice } from "@reduxjs/toolkit";
import { axiosEcomerce } from "../../utils/axiosConfig";
import { setChangeProductCartGlobal } from "./cart.slice";

const initialState = {
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  updatedAt: "",
  createdAt: "",
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : initialState,
  reducers: {
    setUserStateGlobal: (state, action) => {
      return action.payload;
    },
  },
});

const { setUserStateGlobal } = userInfoSlice.actions;

export const logInUser = (data) => (dispatch) => {
  axiosEcomerce
    .post("/users/login", data)
    .then((res) => {
      localStorage.setItem("userInfo", JSON.stringify(res.data));
      dispatch(setUserStateGlobal(res.data));
    })
    .catch((err) => console.log(err));
};

export const userLogOut = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch(setUserStateGlobal(initialState));
  dispatch(setChangeProductCartGlobal([]))
};

export default userInfoSlice.reducer;
