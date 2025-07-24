import { Outlet } from "react-router-dom";

import "./App.css";
import Navbar from "./components/Navbar";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useState, useLayoutEffect } from "react";
import { UserContext } from "./reacContext/MyContext.jsx";
import apiEndpoints from "./AllEndpoint.js";

function App() {
  const { state, setUserData, addToCartContext } = useContext(UserContext);
  const [loading, setLoading] = useState(true);


  useLayoutEffect(() => {
    (async () => {
      try {
        if (!state?.userdata) {
          const response = await fetch(apiEndpoints?.profile, {
            method: "GET",
            credentials: "include",
          });
          const result = await response.json();

          if (response.ok) {
            const response = await fetch(apiEndpoints?.cartFetch, {
              method: "GET",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: result?.userData?.id,
              },
            });
            const cart = await response.json();

            setUserData(result.userData);
            if (cart?.length) {
              addToCartContext(cart);
            }
          }
        } else if (state.cartitem.length === 0) {
          const response = await fetch(apiEndpoints?.cartFetch, {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              Authorization: state?.userdata?.id,
            },
          });
          const cart = await response.json();
          if (cart?.length) {
            addToCartContext(cart);
          }
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div
        className="w-full   flex justify-center z-50"
        style={{ minHeight: "83vh" }}
      >
        {" "}
        <span className="loading loading-spinner text-secondary w-14"></span>
      </div>
    );
  }

  return (
    // <div style={{display:"flex",flexDirection:"column",height:"100vh"}}>
    <>
      <ToastContainer />
      <Navbar />
      <Outlet />

      {/* <Footer /> */}
    </>
    /* </div> */
  );
}

export default App;
