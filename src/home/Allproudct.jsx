import React, { useContext, useEffect } from "react";
import Cards from "../components/Cards";
import { Fragment, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
} from "@heroicons/react/20/solid";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

import Footer from "../components/Footer";
import { UserContext } from "../reacContext/MyContext.jsx";

import apiEndpoints from "../AllEndpoint.js";

const sortOptions = [
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

// const fashion = [
//   {
//     id: "color",
//     name: "Color",
//     options: [
//       { value: "white", label: "White", checked: false },
//       { value: "beige", label: "Beige", checked: false },
//       { value: "blue", label: "Blue", checked: true },
//       { value: "brown", label: "Brown", checked: false },
//       { value: "green", label: "Green", checked: false },
//       { value: "purple", label: "Purple", checked: false },
//     ],
//   },

//   {
//     id: "size",
//     name: "Size",
//     options: [
//       { value: "S", label: "S", checked: false },
//       { value: "M", label: "M", checked: false },
//       { value: "L", label: "L", checked: false },
//       { value: "XL", label: "XL", checked: false },
//       { value: "XXL", label: "XXL", checked: false },
//     ],
//   },
//   {
//     name: "Man",
//   },
//   {
//     name: "WoMan",
//   },
//   {
//     name: "Child",
//   },
// ];
// const mobile = [
//   {
//     id: "category",
//     name: "Brand",
//     options: [
//       { value: "Samsung", label: "Samsung", checked: false },
//       { value: "Oppo", label: "Oppo", checked: false },
//       { value: "Apple", label: "Apple", checked: true },
//       { value: "Realme", label: "Realme", checked: false },
//       { value: "Vivo", label: "Vivo", checked: false },
//     ],
//   },
// ];
// const appliance = [
//   {
//     id: "category",
//     name: "Brand",
//     options: [
//       { value: "Samsung", label: "Samsung", checked: false },
//       { value: "Lg", label: "Lg", checked: false },
//       { value: "Beko", label: "Beko", checked: true },
//       { value: "Realme", label: "Realme", checked: false },
//       { value: "Godrej", label: "Godrej", checked: false },
//     ],
//   },
// ];
// const electronics = [
//   {
//     id: "category",
//     name: "Brand",
//     options: [
//       { value: "Hp", label: "Hp", checked: false },
//       { value: "Accer", label: "Accer", checked: false },
//       { value: "Asus", label: "Asus", checked: true },
//       { value: "Sony", label: "Sony", checked: false },
//       { value: "Lenovo", label: "Lenovo", checked: false },
//     ],
//   },
// ];

let filters = "empty";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Allproudct({ id, kg, name }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { state, setProducts } = useContext(UserContext);

  const [page, setPage] = useState(1);

  const count = 0;
  const pageSize = 15;
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(apiEndpoints.fetAllProducts + id);
        if (response.ok) {
          const result = await response.json();
          setProducts(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const next = () => {
    if (count > 15 * page) {
      setPage(page + 1);
    }
  };
  const prev = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const sort = (e) => {
    if (e === "Price: Low to High") {
       const data= state?.products.sort((a, b) => a.price - b.price);
      
      setProducts(data)
      
    } else {
      const data= state?.products.sort((a, b) => b.price - a.price);
      setProducts(data)
    }
  };
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
      <div className="bg-white">
        {/* Mobile filter dialog */}
       

        <main className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 pt-0 mt-0 h-5/6">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-3 pt-7">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {name}
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 mr-5">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    <div className="py-1 ">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <p
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              <span
                                onClick={() => sort(option.name)}
                                style={{ cursor: "pointer" }}
                              >
                                {option.name}
                              </span>
                            </p>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className={`grid grid-cols lg:grid-cols-6 p-0 `}>
              
              <div
                className={`lg:col-span-5 flex flex-wrap  ${
                  filters === "empty" ? "justify-center  lg:col-span-6" : ""
                }  mt-3  p-0`}
              >
                {state?.products?.map((item, i) => (
                  <div className="mb-10" key={i}>
                    <Cards item={item} kg={kg} />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
          <div className="flex flex-1 justify-between sm:hidden">
            <span
              className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 "
              onClick={prev}
            >
              Previous
            </span>
            <p className="text-sm text-gray-700 mt-2">
              <span className="font-medium">
                {page === 1 ? "01" : pageSize * page - 14}
              </span>{" "}
              to <span className="font-medium">{page * pageSize}</span>
            </p>
            <span
              className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-7 py-2 text-sm font-medium text-gray-700 "
              onClick={next}
            >
              Next
            </span>
          </div>
          <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">
                  {page === 1 ? "01" : pageSize * page - 14}
                </span>{" "}
                to <span className="font-medium">{page * pageSize}</span> of{" "}
                {""}
                <span className="font-medium">{state?.products.length}</span> results
              </p>
            </div>
            <div>
              <nav
                className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                aria-label="Pagination"
              >
                <span className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hg focus:z-20 focus:outline-offset-0">
                  {/* <span className="sr-only">Previous</span> */}
                  <ChevronLeftIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                    onClick={prev}
                  />
                </span>

                <span className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0">
                  {page}
                </span>
                <span className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hg focus:z-20 focus:outline-offset-0">
                  {/* <span className="sr-only">Next</span> */}
                  <ChevronRightIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                    onClick={next}
                  />
                </span>
              </nav>
            </div>
          </div>
        </div>
      </div>

     
    </>
  );
}
