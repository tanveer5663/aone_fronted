import { createContext, useState } from "react";

export const UserContext = createContext();
const initialState = {
  userdata: null,
  cartitem: [],
  totalitem: 0,
  address: [],
  order: [],
  products: [],
};

function MyContext({ children }) {
  const [state, setState] = useState(initialState);

  const setUserData = (data) => {
    setState((prev) => ({ ...prev, userdata: data }));
  };
  const setTotalItem = (count) => {
    // setState((prev) => ({
    //   ...prev,
    //   totalitem: count,
    // }));
  };
  const addToCartContext = (item) => {
   
    let updatedCart;
    if (item.length) {
    
      updatedCart = item;
    } else {
      updatedCart = [...state.cartitem, item];
    }

   

    setState((prev) => ({
      ...prev,
      cartitem: updatedCart,
      totalitem: updatedCart.length,
    }));
  };
  const clearCart = () => {
    setState((prev) => ({
      ...prev,
      cartitem: null,
      totalitem: 0,
    }));
  };
  const removeToCartContext = (id) => {
    const updatedCart = state.cartitem.filter((item) => item.id !== id);
    setState((prev) => ({
      ...prev,
      cartitem: updatedCart,
      totalitem: updatedCart.length,
    }));
  };
  const setAddress = (address) => {
   
    let updateAdd;
    if (address.length) {
      updateAdd = address;
    } else {
      updateAdd = [...state.address, address];
    }

    setState((prev) => ({
      ...prev,
      address: updateAdd,
    }));
  };
  const setOrder = (data) => {
    setState((prev) => ({
      ...prev,
      order: data,
    }));
  };
  const setProducts = (data) => {
    setState((prev) => ({
      ...prev,
      products: data,
    }));
  };
  const value = {
    state,
    setUserData,
    addToCartContext,
    setTotalItem,
    setAddress,
    removeToCartContext,
    clearCart,
    setOrder,
    setProducts,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export default MyContext;
