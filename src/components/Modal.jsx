import { Fragment,  useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { UserContext } from "../reacContext/MyContext";
import { useNavigate } from "react-router-dom";
import {
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

import apiEndpoints from "../AllEndpoint";

export default function Modal({ data, setOpen1, title, orders }) {
  const cancelButtonRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const { clearCart, state } = useContext(UserContext);

  async function cartDelete(id) {
    setLoading(true);
    try {
      const response = await fetch(apiEndpoints?.cartDelete + id, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setOpen1(false, id);
      } else {
        console.error("Failed to delete cart item");
      }
    } catch (error) {
      console.error("Error deleting cart item:", error);
    } finally {
      setLoading(false);
    }
  }
  const ord = async () => {
    clearCart();
    navigate("/orderpage");
    const response = fetch(apiEndpoints?.deleteCart + state?.userdata.id, {
      method: "DELETE",
    });
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className={"sm:flex sm:items-start "}>
                    <div
                      className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${
                        data ? "bg-red-100" : ""
                      } 
                      sm:mx-0 sm:h-10 sm:w-10`}
                    >
                      {data ? (
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      ) : (
                        <CheckCircleIcon
                          className="h-20 w-20 text-green-600 bg-"
                          // aria-hidden="true"
                        />
                      )}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title
                        as="h3"
                        className="text-base font-semibold leading-6 text-gray-900 mt-2"
                      >
                        {data ? "Delete" : ""} {title}
                      </Dialog.Title>
                      {data ? (
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to delete this Cart item ?
                          </p>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  {data ? (
                    <>
                      {" "}
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={() => {
                          cartDelete(data);
                        }}
                        disabled={loading}
                      >
                        Delete
                      </button>{" "}
                      <button
                        type="button"
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                        onClick={() => setOpen1(false)}
                        ref={cancelButtonRef}
                        disabled={loading}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-7 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        onClick={ord}
                      >
                        Go to Order
                      </button>{" "}
                    </>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
