import React, { useContext, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

import { UserContext } from "../reacContext/MyContext";
import apiEndpoints from "../AllEndpoint";
import { toast } from "react-toastify";

const Cards = ({ item, kg }) => {
  const { state, addToCartContext } = useContext(UserContext);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };
  const addToCart = async (data) => {
    data = { ...data, price: data.price.toString() };
    try {
      const response = await fetch(apiEndpoints?.cartAdd, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.status == "Item Already Added") {
          toast.error("Iteam Already Added", {
            position: "bottom-left",

            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,

            theme: "dark",
          });
        } else if (result.status == "Item Added to Cart") {
          addToCartContext(result.data);
          toast.success("Iteam Added to Cart", {
            position: "bottom-left",

            autoClose: 200,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,

            theme: "dark",
          });
          // setTotalItem(state?.totalitem + 1);
        }
       
      } else {
        console.error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div
      className=" bg-primaryBG shadow-xl relative h-72  mx-3 rounded-md w-60 mc"
      style={{ minWidth: "15rem" }}
    >
      <div
        className={`rating  absolute right-0 top-0  p-2 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        }`}
        onClick={handleHeartClick}
      >
        <FaHeart className="w-5 h-5 cursor-pointer" />
      </div>

      <Link to={`/product/${item.id}`}>
        <figure className="flex justify-center">
          <img
            src={item.image}
            alt={item.image}
            className=" h-36  rounded-md  mt-6"
          />
        </figure>
      </Link>
      <div className="mt-9">
        <Link to={`/product/${item.id}`}>
          <p className=" font-semibold text-center p-0 ">{item.title}</p>
        </Link>
      </div>

      <div className="mt-3">
        <div className="text-md font-semibold  flex justify-between  ">
          <Link to={`/product/${item.id}`}>
            <div className="flex items-center self-center ml-3 pt-1 ">
              Rs. {item.price} {kg}
            </div>
          </Link>
          {state?.userdata?.id ? (
            <div
              className="textred text-3xl mr-3"
              onClick={() => {
                const data = {
                  productid: item.id,
                  userid: state?.userdata?.id,
                  title: item.title,
                  price: item.price,
                  category: item.category,
                  image: item.image,
                };
                addToCart(data);
              }}
              style={{ cursor: "pointer" }}
            >
              +
            </div>
          ) : (
            <Link to={"/login"}>
              <div className="textred text-3xl mr-3">+</div>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cards;
