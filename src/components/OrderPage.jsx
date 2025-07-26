import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Footer from "./Footer";
import { UserContext } from "../reacContext/MyContext";
import apiEndpoints from "../AllEndpoint";

export default function OrderPage() {
  const [loading, setLoading] = useState(false);
  const { state, setOrder } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(
          apiEndpoints?.getOrder + state?.userdata.id
        );
        if (response.ok) {
          const result = await response.json();
          setOrder(result);
      
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
      <div>
        <div>
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900 text-center">
            {state?.order.length ? "Orders" : " No Orders"}
          </h1>

          {state?.order?.map((order) => (
            <div key={order._id}>
              <div>
                <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8 border border-gray-200">
                  <div className=" px-4 py-6 sm:px-6">
                    <h1 className="text-xl my-5 font-bold tracking-tight text-gray-900  border-b border-gray-200 ">
                      Order Id: {order.id}
                    </h1>

                    <div className="flow-root">
                      <ul className="-my-6 divide-y divide-gray-200">
                        {order.productArray.map((item) => (
                          <li key={item.createdAt} className="flex py-6">
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

                            <div className="ml-4 flex flex-1 flex-col">
                              <div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                  <h3>
                                    <Link to={`/product/${item.productId}`}>
                                      {" "}
                                      {item.title}
                                    </Link>
                                  </h3>
                                  <p className="ml-4">Rs. {item.price}</p>
                                </div>
                              </div>
                              <div className="flex flex-1 items-end justify-between text-sm">
                                <div className="text-gray-500">
                                  <label
                                    htmlFor="quantity"
                                    className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                                  >
                                    Qty :{item.quantity}
                                  </label>
                                </div>

                                <div className="flex"></div>
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
                        {order.productArray.reduce((it, ite) => {
                          return (
                            Number(it) +
                            Number(ite.price) * Number(ite.quantity)
                          );
                        }, 0)}
                      </p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900 mt-3">
                      <p>Total Items Quantity</p>
                      <p>
                        {" "}
                        {order.productArray.reduce((it, ite) => {
                          return Number(it) + Number(ite.quantity);
                        }, 0)}{" "}
                        Items
                      </p>
                    </div>
                    <div className="flex justify-between my-2 text-base font-medium text-gray-900 mt-3">
                      <p>Order Date</p>
                      <p>{order.createdAt.substring(0, 10)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
    
      </div>
    </>
  );
}
