import React, { useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { useContext } from "react";
import { UserContext } from "../reacContext/MyContext.jsx";
import { useNavigate } from "react-router-dom";
import apiEndpoints from "../AllEndpoint.js";

const Signup = () => {
  const { state, setUserData } = useContext(UserContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useLayoutEffect(() => {
    if (state?.userdata) {
      navigate("/");
    }
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <>
      {state?.userData && navigate("/")}
      <div className=" w-full  h-screen flex items-center justify-center   bg-gradient-to-r from-indigo-500 via-purple-4000 to-pink-400">
        <div className="modal-box  content-center">
          <div className="modal-action flex flex-col justify-center mt-0">
            <form
              onSubmit={handleSubmit(async (data) => {
                try {
                  setLoading(true);
                  const response = await fetch(apiEndpoints?.signup, {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    credentials: "include",

                    body: JSON.stringify({
                      email: data.email,
                      password: data.password,
                    }),
                  });
                  const result = await response.json();
                  if (response.ok) {
                    setUserData(result.userData);
                    navigate("/");
                  } else {
                    setError(result.message);
                  }
                } catch (error) {
                  console.log(error.message);
                } finally {
                  setLoading(false);
                }
              })}
              className="card-body"
              method="dialog"
            >
              <h3 className="font-bold text-2xl text-center ">Please Signup</h3>

              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">
                    Email <span className="textred">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  {...register("email", {
                    required: "email is required",
                    pattern: {
                      value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                      message: "email not valid",
                    },
                  })}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>

              {/* password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">
                    Password <span className="textred">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  autoComplete="true"
                  className="input input-bordered"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
                {errors.password && (
                  <p className="text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base">
                    Confirm Password <span className="textred">*</span>
                  </span>
                </label>
                <input
                  type="password"
                  placeholder=" Confirm password"
                  autoComplete="true"
                  className="input input-bordered"
                  {...register("confirmPassword", {
                    required: "confirm password is required",
                    validate: (value, formValues) =>
                      value === formValues.password ||
                      "Confirm password not matching",
                  })}
                />
              </div>

              {errors.confirmPassword && (
                <p className="text-red-500">{errors.confirmPassword.message}</p>
              )}
              {error && error === "Email already exists" && (
                <p className="text-red-500">{error}</p>
              )}

              {/* login btn */}
              <div className="form-control mt-4">
                <button
                  type="submit"
                  className="h-12 rounded-lg bg-green text-white"
                  disabled={loading}
                >
                  Login
                </button>
              </div>

              <Link to="/">
                <button
                  htmlFor="my_modal_5"
                  className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                >
                  ✕
                </button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
