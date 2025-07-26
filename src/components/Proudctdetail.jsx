import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import apiEndpoints from "../AllEndpoint";
import { UserContext } from "../reacContext/MyContext";

export default function Proudctdetail() {
  const { state, addToCartContext } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [product, setProduct] = useState(null);
  const [allready, setAllready] = useState(false);
  const location = useParams();
  const navi = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(apiEndpoints?.productById + location.id, {
          method: "GET",
        });
        if (response.ok) {
          const data = await response.json();
          setProduct(data);
          if (state?.cartitem?.length) {
            const isAlreadyAdded = state.cartitem.some(
              (item) => item.productId === data.id
            );

            setAllready(isAlreadyAdded);
          }
        }
      } catch (error) {
        console.log("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  async function addToCart(data) {
    try {
      setButtonLoading(true);
      const response = await fetch(apiEndpoints?.cartAdd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        addToCartContext(result.data);

        navi("/cart");
        setButtonLoading(false);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      setButtonLoading(false);
    }
  }
  if (loading) {
    return (
      <div
        className="w-full   flex justify-center "
        style={{ minHeight: "83vh" }}
      >
        {" "}
        <span className="loading loading-spinner text-secondary w-14"></span>
      </div>
    );
  }

  return (
    <>
      <div
      // style={{ display: "flex", flexDirection: "column", height: "90.8vh" }}
      >
        <section className="text-gray-700 body-font overflow-hidden bg-white flex justify-center w-full">
          <div className="container px-5 py-24 mx-auto lg:w-9/12">
            <div className=" mx-auto flex flex-wrap">
              <div className=" ">
                <img
                  alt="ecommerce"
                  className=" object-cover object-center   ml-8  lg:mt-12 max-w-sm max-h-80"
                  src={product?.image}
                />
              </div>

              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {product?.title}
                </h1>
                <div className="flex mb-4"></div>
                <p className="leading-relaxed">
                  Fam locavore kickstarter distillery. Mixtape chillwave tumeric
                  sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo
                  juiceramps cornhole raw denim forage brooklyn. Everyday carry
                  +1 seitan poutine tumeric. Gastropub blue bottle austin
                  listicle pour-over, neutra jean shorts keytar banjo tattooed
                  umami cardigan.
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  {product?.category === "mob" ||
                  product?.category === "ele" ||
                  product?.category === "fash" ? (
                    <div className="flex">
                      <span className="mr-3">Color</span>
                      <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                      <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                    </div>
                  ) : (
                    ""
                  )}

                  {product?.category === "fash" ? (
                    <div className="flex ml-6 items-center">
                      <span className="mr-3">Size</span>
                      <div className="relative">
                        <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                          <option>SM</option>
                          <option>M</option>
                          <option>L</option>
                          <option>XL</option>
                        </select>
                        <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            className="w-4 h-4"
                            viewBox="0 0 24 24"
                          >
                            <path d="M6 9l6 6 6-6"></path>
                          </svg>
                        </span>
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>

                <div className="flex">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    Rs. {product?.price}{" "}
                    {product?.category === "fru" || product?.category === "veg"
                      ? "/Kg"
                      : ""}
                  </span>

                  {state?.userdata ? (
                    <button
                      className="flex ml-auto text-white bg-green border-0 py-2 px-6 h focus:outline-none hover:bg-red-600 rounded"
                      onClick={() => {
                        const data = {
                          productid: product.id,
                          userid: state?.userdata?.id,
                          title: product.title,
                          price: product.price + "",
                          category: product.category,
                          image: product.image,
                        };
                        if (allready) {
                          navi("/cart");
                          return;
                        }
                        addToCart(data);
                      }}
                      disabled={buttonLoading}
                    >
                      {!allready ? "Add to Cart" : "go to Cart"}
                    </button>
                  ) : (
                    <button
                      className="flex ml-auto text-white bg-green border-0 py-2 px-6 h focus:outline-none hover:bg-red-600 rounded"
                      onClick={() => navi("/login")}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* <Footer /> */}
      </div>
    </>
  );
}
