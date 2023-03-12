import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { logInUser, userLogOut } from "../store/slice/userInfo.slice";

import "./styles/Login.css"

const Login = () => {
  const { register, handleSubmit, reset } = useForm();

  const {
    token, user
  } = useSelector(store => store.userInfo);

 
  

  const dispatch = useDispatch()

  const submit = (data) => {
    dispatch(logInUser(data)) 
    reset({
      email:"",
      password:""
    });   
  };

  const handleLogOut = () => {
    dispatch(userLogOut())
  }

  return (
    <main className="login">
      {token ? (
        <section className="login-logged__container">
          <i className="bx bxs-user-pin login-logged__icon"></i>
          <h4 className="login-logged__name">
            {user.firstName} {user.lastName}
          </h4>
          <button className="login-logged__btn" onClick={handleLogOut}>
            Log out
          </button>
        </section>
      ) : (
        <form
          className="login-form__container"
          action=""
          onSubmit={handleSubmit(submit)}
        >
          <h3 className="login-form__title">
            Welcome! log in your email of username to coontinue...
          </h3>
          <div className="login-form__containerTest">
            <h4 className="login-form__titleTest">Test data</h4>
            <div className="login-form__emailTest">
              <i className="bx bx-envelope"></i> john@gmail.com
            </div>
            <div className="login-form__passwordTest">
              <i className="bx bxs-user"></i> john1234
            </div>
          </div>

          <div className="login-form__divInfo">
            <label className="login-form__label" htmlFor="">
              email
            </label>

            <input
              className="login-form__input"
              type="text"
              {...register("email")}
            />
          </div>

          <div className="login-form__divInfo">
            <label className="login-form__label" htmlFor="">
              password
            </label>
            <input
              className="login-form__input"
              type="password"
              {...register("password")}
            />
          </div>

          <button className="login-form__btn"> Log in</button>

          <p className="login-form__footer">
            {" "}
            Don't have count? <span> Sign Up</span>{" "}
          </p>
        </form>
      )}
    </main>
  );
};

export default Login;
