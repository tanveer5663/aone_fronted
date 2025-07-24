import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { UserContext } from "../reacContext/MyContext.jsx";
import apiEndpoints from "../AllEndpoint.js";

const Navbar = () => {
  const { state, setUserData } = useContext(UserContext);

  const log = async () => {
    const response = await fetch(apiEndpoints?.logout, {
      method: "GET",
      credentials: "include",
    });
    if (response.ok) {
      setUserData(null);
    }
  };

  return (
    <header className="bg-gradient-to-r from-indigo-100 from-10% via-sky-1s00 via-30% to-emerald-100 to-90%">
      <div className=" navbar">
        <div className="flex-1">
          <Link to={"/"} className="ml-2">
            <img src="images/logo.png" alt="" width={"35px"} height={"35px"} />
          </Link>
          <Link to={"/"}>
            <p className="ml-1" style={{ color: "#1d4ed8", fontSize: "1.2em" }}>
              All in One
            </p>
          </Link>
        </div>
        <div className="dropdown dropdown-end">
          <div className="indicator mt-2 mr-5">
            {state?.userdata ? (
              <div>
                {state?.totalitem ? (
                  <Link to={"/cart"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    <span className="badge badge-md indicator-item">
                      {state?.totalitem}
                    </span>
                  </Link>
                ) : (
                  <Link to={"/"}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-7 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </Link>
                )}
              </div>
            ) : (
              <Link to={"/login"}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>

        {!state?.userdata ? (
          <Link to={"/login"}>
            <button className="btns flex items-center gap-2 rounded-full px-6 bg-green text-white">
              Login
            </button>
          </Link>
        ) : (
          <div className="flex-none">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="./images/photo-1534528741775-53994a69daeb.jpg"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link className="justify-between">Profile</Link>
                </li>
                <li>
                  <Link
                    to={"/orderpage"}
                    replace={true}
                    className="justify-between"
                  >
                    My Orders
                  </Link>
                </li>

                <li onClick={log}>
                  <Link className="justify-between"> Logout</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </header>
    //
  );
};

export default Navbar;
