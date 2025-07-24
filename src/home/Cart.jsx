import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Modal from "../components/Modal";
import Footer from "../components/Footer";
import apiEndpoints from "../AllEndpoint";
import { UserContext } from "../reacContext/MyContext";


export default function Cart() {
  // const [product, setProduct] = useState([]);
  const { state, removeToCartContext, addToCartContext } =
    useContext(UserContext);

  const [open, setOpen] = useState(false);
  const [id, setid] = useState();
  const [title, setTitle] = useState();

  const modal = (data, title) => {
    setid(data);
    setTitle(title);
    setOpen(true);
  };
  const setOpen1 = (data, id) => {
    removeToCartContext(id);
    
    setOpen(data);
  };

  const cartupdate = async (data) => {
    try {
      const response = await fetch(
        apiEndpoints?.cartUpdate + data.id + "/" + data?.item,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const updateProduct = state.cartitem.map((item) => {
          if (item.id === data.id) {
            return { ...item, quantity: data.item };
          }
          return item;
        });
        addToCartContext(updateProduct);
      }
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };



  return (
    <>
      <div
        style={{ display: "flex", flexDirection: "column", height: "90.8vh" }}
      >
        <div>
          <div className="mx-auto mt-0 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-center">
                Cart
              </h1>

              <div className="flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                 

                  {state?.cartitem.map((item, i) => (
                    <li key={i} className="flex py-6">
                      <div className="h-24 w-32 flex place-content-center  ">
                        <Link to={`/product/${item.productId}`}>
                          <img
                            src={item.image}
                            alt={item.image}
                            className="h-24 "
                            style={{ maxWidth: "7em" }}
                          />
                        </Link>
                      </div>

                      <div className="ml-4= flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link to={`/product/${item.productId}`}>
                                {" "}
                                {item.title}
                              </Link>
                            </h3>
                            <p className="ml-4">
                              Rs. {item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm ">
                          <div className="text-gray-500">
                            <label
                              htmlFor="quantity"
                              className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                            >
                              Qty
                            </label>
                            <select
                              className="text-gray-900"
                              defaultValue={item.quantity}
                              onChange={(e) => {
                                const val = {
                                  id: item.id,
                                  item: e.target.value,
                                };
                                cartupdate(val);
                              }}
                              aria-readonly
                            >
                              <option value="1" className="text-gray-900">
                                1
                              </option>
                              <option value="2" className="text-gray-900">
                                2
                              </option>
                              <option value="3" className="text-gray-900">
                                3
                              </option>
                              <option value="4" className="text-gray-900">
                                4
                              </option>
                              <option value="5" className="text-gray-900">
                                5
                              </option>
                            </select>
                          </div>

                          <div className="flex">
                            <button
                              onClick={() => modal(item.id, item.title)}
                              type="button"
                              className="font-medium hover:text-indigo-500 textred"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>
                  Rs.{" "}
                  {state?.cartitem?.reduce((it, ite) => {
                    return (
                      Number(it) + Number(ite.price) * Number(ite.quantity)
                    );
                  }, 0)}
                </p>
              </div>
              <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{state?.cartitem?.length} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent px-6 bg-green py-3 text-base font-medium text-white shadow-sm  h"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      {open ? <Modal data={id} setOpen1={setOpen1} title={title} /> : ""}
    </>
  );
}
