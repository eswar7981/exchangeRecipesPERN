import React, { useEffect, useState,useContext } from "react";

import { Rating } from "@material-tailwind/react";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Store/AuthStore";

const Login = () => {
  const dispatch = useDispatch();
  const naviagate = useNavigate();
  const [login, setLogin] = useState(false);
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });

  const emailHandler = (e) => {
    setLoginDetails({ ...loginDetails, ["email"]: e.target.value });
  };

  const passwordHandler = (e) => {
    setLoginDetails({ ...loginDetails, ["password"]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(loginDetails);
    fetch(`${process.env.REACT_APP_BACKEND_URL}/authentication/user/login`, {
      method: "POST",
      body: JSON.stringify({
        email: loginDetails.email,
        password: loginDetails.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        console.log(res.token1)
        if(res.token1){
          dispatch(authActions.login());
          dispatch(authActions.setToken(res.token1));
          setLogin(true);
          dispatch(authActions.setFollowers(res.followers))
          naviagate("/home");
          setTimeout(() => {
            setLogin(false);
          }, 1000);
        };
        })
       
    //setLoginDetails({ email: '', password: '' })
  };

  return (
    <>
     

      {login && (
        <div
          class="flex absolute items-center p-4 ml-27 mb-4 text-center text-green-1000 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 me-7"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div className="text-green-1000">
            <span class="font-medium">login is successful!</span>
          </div>
        </div>
      )}
      <section class="bg-gray-50 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={submitHandler}>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                  required
                    onChange={emailHandler}
                    value={loginDetails.email}
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                  required
                    onChange={passwordHandler}
                    value={loginDetails.password}
                    type="password"
                    name="password"
                    id="password"
                    class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  />
                </div>
                <div class="flex items-center justify-between">
                  <a
                    href="#"
                    class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className=" content-center font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  SignIn
                </button>

                <NavLink style={{ textDecoration: "None" }} to="/adminLogin">
                  <div className="font-medium mt-10 text-primary-600 hover:underline dark:text-primary-500">
                    Are you an Admin? SignIn as Admin
                  </div>
                </NavLink>

                <NavLink style={{ textDecoration: "None" }} to="/"></NavLink>
                <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                  Don’t have an account yet?{" "}
                  <NavLink style={{ textDecoration: "None" }} to="/sign-up">
                    <div className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                      SignUp
                    </div>
                  </NavLink>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
