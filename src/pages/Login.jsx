import React, { useActionState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import useToggleStore from "../stores/useToggleStore";
import { useAuth } from "../context/AuthContextProvider";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { signInUser } = useAuth();
  const { showPassord, togglePassword } = useToggleStore();
  const [error, submitAction, isPending] = useActionState(
    async (prev, formData) => {
      const email = formData.get("email");
      const password = formData.get("password");

      const {
        success,
        data,
        error: signInError,
      } = await signInUser(email, password);
      if (signInError) {
        return new Error(signInError);
      }
      if (success && data?.session) {
        navigate("/mainlibrary");
        return null;
      }
      return null;
    },
    null
  );
  return (
    <div className=" mt-20 w-full h-full flex justify-center items-center ">
      <div className="back -z-1" />

      <form
        action={submitAction}
        className="form shadow w-85 h-120 md:w-120 md:h-120  lg:w-140 lg:h-140 pl-8   rounded-lg md:pl-10 lg:pl-18 z-10  "
      >
        <h1 className="text-4xl text-white mb-8 mt-16">Login</h1>
        <div className="flex flex-col justify-center   max-w-70 sm:max-w-100">
          <label htmlFor="email" className=" text-white">
            Email
          </label>
          <input
            aria-required="true"
            aria-invalid={error ? "true" : "false"}
            aria-describedby={error ? "signin-error" : undefined}
            disabled={isPending}
            type="email"
            name="email"
            id="email"
            placeholder="Enter your Email..."
            required
            className="inp outline-none w-full rounded-md mb-4  bg-red-200 px-4 py-2  text-[rgb(170,170,170)]  "
          />
          <label htmlFor="password" className=" text-white">
            Password
          </label>
          <div className="flex ">
            <input
              aria-required="true"
              aria-invalid={error ? "true" : "false"}
              aria-describedby={error ? "signin-error" : undefined}
              disabled={isPending}
              type={`${showPassord ? "text" : "password"}`}
              name="password"
              id="password"
              placeholder="Enter your Password..."
              className=" inp outline-none w-full  rounded-md mb-4  bg-red-200 px-4 py-2 text-[rgb(170,170,170)] "
            />
            <FaRegEyeSlash
              onClick={togglePassword}
              className="w-5 h-5 ml-3 mt-3 cursor-pointer "
              color="rgb(170,170,170)"
            />
          </div>
          <button
            aria-busy={isPending}
            disabled={isPending}
            type="submit"
            className="rounded-full text-white  px-4 py-2 text-xl border-1 w-40 transition transform duration-300 ease-in-out hover:scale-110 cursor-pointer my-4"
          >
            Login
          </button>
          <p className="text-white">
            Don't have an accout ?
            <Link to="/signup">
              <span className="border-b-2 border-transparent hover:border-white transition transform ease-in-out duration-300 cursor-pointer">
                Sign Up
              </span>
            </Link>
          </p>
          {error && (
            <div id="signin-error" role="alert" className="text-red-500">
              {error.message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}

export default Login;
