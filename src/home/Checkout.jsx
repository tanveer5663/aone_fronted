import React, { useContext, useEffect, useMemo, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { set, useForm } from "react-hook-form";

import { toast } from "react-toastify";
import { UserContext } from "../reacContext/MyContext";

import Modal from "../components/Modal";
import Footer from "../components/Footer";
import apiEndpoints from "../AllEndpoint";

export default function Checkout() {
  const [open, setOpen] = useState(false);
  const [id, setid] = useState();
  const [title, setTitle] = useState();
  const [payment, setpayment] = useState();
  const [orders, setOrders] = useState({});
  const { state, removeToCartContext, setAddress } = useContext(UserContext);

  const [add, setAdd] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          apiEndpoints?.getAddress + state?.userdata?.id,
          {
            method: "GET",
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data?.length) {
            setAddress(data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  const modal = (data, title) => {
    setOpen(true);
 
    setid(data);
    setTitle(title);
   
  };
  const setOpen1 = (data, id) => {
    removeToCartContext(id);
    setOpen(data);
  };
  const handleAddress = (e) => {
    setAdd(e.target.value);
  };
  const handlePayment = (e) => {
    setpayment(e.target.value);
  };
  const handleOrder = async () => {
    if (payment && add) {
      const total = totalAmount;
      const data = {
        userId: state.userdata.id,
        productArray: state.cartitem,
        totalamount: total.toString(),
        totalitem: state.cartitem.length.toString(),
      };

      try {
        const response = await fetch(apiEndpoints?.placedOrder, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
        if (response.ok) {
         
          modal("", "Your Order Successfully placed");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      toast.error("Please choose Address and Payment ", {
        position: "bottom-left",

        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,

        theme: "dark",
      });
    }
  };
  const totalAmount = useMemo(() => {
    return state?.cartitem?.reduce((acc, item) => {
      return acc + Number(item.price) * Number(item.quantity);
    }, 0);
  }, [state.cartitem]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="lg:col-span-3">
            {/* This form is for address */}

            <form
              className="bg-white px-5 py-12 mt-12"
              noValidate
              onSubmit={handleSubmit(async (data) => {
                data = { ...data, userId: state?.userdata?.id };

                try {
                  const response = await fetch(apiEndpoints?.addAddress, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                  });
                  if (response.ok) {
                    const result = await response.json();
                    setAddress(result.address);
                    reset();
                  }
                } catch (error) {
                  console.log(error);
                }
              })}
            >
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-semibold leading-7 text-gray-900">
                    Personal Information
                    <span className="textred text-xl">*</span>
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    {/* <div className="sm:col-span-4">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Email address<span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", {
                            required: "email is required*",
                            pattern: {
                              value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                              message: "email not valid*",
                            },
                          })}
                          type="email"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.email && (
                          <p className="text-red-500">{errors.email.message}</p>
                        )}
                      </div>
                    </div> */}

                    <div className="col-span-5">
                      <label
                        htmlFor="street-address"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Street address<span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("street", {
                            required: "street is required*",
                          })}
                          id="street"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.street && (
                          <p className="text-red-500">
                            {errors.street.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-5">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Full name<span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("name", {
                            required: "name is required*",
                          })}
                          id="name"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.name && (
                          <p className="text-red-500">{errors.name.message}</p>
                        )}
                      </div>
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Phone<span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", {
                            required: "phone is required*",
                            pattern: {
                              value: /^(\+\d{1,3}[- ]?)?\d{10}$/gi,
                              message: "Number in not valid*",
                            },
                          })}
                          type="tel"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.phone && (
                          <p className="text-red-500">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* <div className="sm:col-span-2 sm:col-start-1">
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        City<span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("city", {
                            required: "city is required*",
                          })}
                          id="city"
                          autoComplete="address-level2"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.city && (
                          <p className="text-red-500">{errors.city.message}</p>
                        )}
                      </div>
                    </div> */}

                    {/* <div className="sm:col-span-2">
                      <label
                        htmlFor="state"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        State / Province
                        <span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("state", {
                            required: "state is required*",
                          })}
                          id="state"
                          autoComplete="address-level1"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.state && (
                          <p className="text-red-500">{errors.state.message}</p>
                        )}
                      </div>
                    </div> */}

                    <div className="sm:col-span-2">
                      <label
                        htmlFor="pinCode"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ZIP / Postal code
                        <span className="textred text-l">*</span>
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          {...register("pinCode", {
                            required: "pinCode is required*",
                            pattern: {
                              value: /^(\+\d{1,3}[- ]?)?\d{6}$/gi,
                              message: "Pincode is not valid*",
                            },
                          })}
                          id="pinCode"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                        {errors.pinCode && (
                          <p className="text-red-500">
                            {errors.pinCode.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                  <button
                    onClick={(e) => reset()}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="rounded-md bg-green px-3 py-2 text-sm font-semibold text-white shadow-sm h focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Add Address
                  </button>
                </div>
              </div>
            </form>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Choose from Existing addresses
              </p>

              <ul style={{ overflowY: "scroll", maxHeight: "15em" }}>
                {state?.address.map((address, index) => (
                  <li
                    key={index}
                    className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200 mb-2"
                  >
                    <div className="flex gap-x-4">
                      <input
                        onChange={handleAddress}
                        name="address"
                        type="radio"
                        value={index}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {address.name}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.street}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                          {address.pinCode}
                        </p>
                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                      <p className="text-sm leading-6 text-gray-900">
                        Phone: {address.phone}
                      </p>
                      <p className="text-sm leading-6 text-gray-500">
                        {address.city}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 space-y-10">
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Payment Methods
                  </legend>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Choose One
                  </p>
                  <div className="mt-6 space-y-6">
                    <div className="flex items-center gap-x-3">
                      <input
                        id="cash"
                        name="payments"
                        onChange={handlePayment}
                        value="cash"
                        type="radio"
                        // checked={paymentMethod === "cash"}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="cash"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Cash
                      </label>
                    </div>
                    {/* <div className="flex items-center gap-x-3">
                      <input
                        id="card"
                        // onChange={handlePayment}
                        name="payments"
                        // checked={paymentMethod === "card"}
                        value="card"
                        type="radio"
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                      />
                      <label
                        htmlFor="card"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Card Payment
                      </label>
                    </div> */}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="mx-auto mt-12 bg-white max-w-7xl px-2 sm:px-2 lg:px-4">
              <div className="border-t border-gray-200 px-0 py-6 sm:px-0">
                <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
                  Cart
                </h1>
                <div className="flow-root">
                  <ul
                    className="-my-6 divide-y divide-gray-200"
                    style={{ overflowY: "scroll", maxHeight: "45em" }}
                  >
                    {state?.cartitem?.map((item) => (
                      <li key={item.id} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md  flex justify-center">
                          <Link to={`/product/${item.productid}`}>
                            <img
                              src={item.image}
                              alt={item.image}
                              className="h-24"
                            />
                          </Link>
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.title}</h3>
                              <p className="mr-5">
                                Rs. {item.price * item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="text-gray-500">
                              <label
                                htmlFor="quantity"
                                className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                              >
                                Qty
                              </label>
                              <select
                                onChange={(e) => {
                                  const val = {
                                    id: item._id,
                                    item: e.target.value,
                                  };
                                  // dispatch(cartupdate(val));
                                }}
                                value={item.quantity}
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
                                className="font-medium text-red-600 hover:text-indigo-500 mr-3"
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

              <div className="border-t border-gray-200 px-2 py-6 sm:px-2">
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>Rs. {totalAmount}</p>
                </div>
                <div className="flex justify-between my-2 text-base font-medium text-gray-900">
                  <p>Total Items in Cart</p>
                  {state?.cartitem?.length}
                  items
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <div
                    onClick={handleOrder}
                    className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Order Now
                  </div>
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
        </div>
      </div>
    
      {open ? (
        <Modal data={id} setOpen1={setOpen1} title={title} orders={orders} />
      ) : (
        ""
      )}
    </>
  );
}
