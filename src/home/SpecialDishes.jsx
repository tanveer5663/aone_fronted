/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import Cards from "../components/Cards";

const SpecialDishes = ({ data, id, kg }) => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (id === "product") {
      fetch("/top.json")
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
        });
    }
    if (id === "app") {
      fetch("/topapp.json")
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
        });
    }
    if (id === "fv") {
      fetch("/fruVeg.json")
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
        });
    }
    if (id === "bg") {
      fetch("/bg.json")
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
        });
    }
    if (id === "fs") {
      fetch("/fashion.json")
        .then((res) => res.json())
        .then((data) => {
          setRecipes(data);
        });
    }
  }, []);

  const prev = () => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft - 790;
  };
  const next = () => {
    var slider = document.getElementById(id);
    slider.scrollLeft = slider.scrollLeft + 790;
  };

  return (
    //
    <>
      <div className="text-left mt-8 ml-16 flex justify-between">
        <h2 className="text-3xl font-bold  ">{data}</h2>

        <div className="flex hid mr-10  ">
          <span className="mr-4" onClick={prev}>
            <FaAngleLeft className=" h-8 w-8 rounded-full bg-green " />
          </span>
          <span onClick={next}>
            <FaAngleRight className=" h-8 w-8 rounded-full bg-green  " />
          </span>
        </div>
      </div>

      <div className=" flex justify-center justify-items-center items-center">
        <div id={id} className="cent h-80 flex flex-row mt-8 ">
          {recipes.map((item, i) => (
            <Cards item={item} kg={kg} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default SpecialDishes;
