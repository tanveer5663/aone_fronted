import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";

import Home from "../home/Home";

import Protected from "../home/Protected";

const Login = lazy(() => import("../components/Login"));
const Cart = lazy(() => import("../home/Cart"));
const Checkout = lazy(() => import("../home/Checkout"));
const OrderPage = lazy(() => import("../components/OrderPage"));
const Signup = lazy(() => import("../components/Signup"));
const Proudctdetail = lazy(() => import("../components/Proudctdetail"));
const Allproudct = lazy(() => import("../home/Allproudct"));
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",

        element: <Home />,
      },

      {
        path: "/product/:id",

        element: <Proudctdetail />,
      },

      {
        path: "grocery",
        element: <Allproudct id={"groc"} name={"All Grocery."} />,
      },
      {
        path: "mobiles",
        element: <Allproudct id={"mob"} name={"All Mobiles."} />,
      },
      {
        path: "appliances",
        element: <Allproudct id={"app"} name={"All Appliances."} />,
      },
      {
        path: "electronics",
        element: <Allproudct id={"ele"} name={"All Items."} />,
      },
      {
        path: "fashions",
        element: <Allproudct id={"fash"} name={"All Dresses."} />,
      },
      {
        path: "fruits",
        element: <Allproudct id={"fru"} name={"All Fruits."} kg={"/kg"} />,
      },
      {
        path: "vegetables",
        element: <Allproudct id={"veg"} name={"All Vegetables."} kg={"/Kg"} />,
      },
      {
        path: "beverages",
        element: <Allproudct id={"bev"} name={"All Beverages."} />,
      },

      {
        path: "/cart",
        element: (
          <Protected>
            <Cart />
          </Protected>
        ),
      },
      {
        path: "/checkout",
        element: (
          <Protected>
            <Checkout />
          </Protected>
        ),
      },
      {
        path: "/orderpage",
        element: <OrderPage />,
      },
    ],
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
