import React, { useContext, } from "react";

import { UserContext } from "../reacContext/MyContext";
import { useNavigate } from "react-router-dom";


export default function Protected({ children }) {
 
  const { state } = useContext(UserContext);
  const navigate = useNavigate();

  if (!state.userdata) {
    navigate("/login");
  }
  if (state.totalitem === 0) {
    navigate("/");
  }

  return children;
}
