import React from "react";
// import Banner from "../../components/Banner";
import Catagories from "./Catagories";
import SpecialDishes from "./SpecialDishes";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      {/* <Banner /> */}
      <Catagories />

      <SpecialDishes data={"Top Products."} id={"product"} />
      <SpecialDishes data={"Top Appliances."} id={"app"} />
      <SpecialDishes data={"Top Fruits & Veg."} id={"fv"} kg={"/kg"} />
      <SpecialDishes data={"Top Beve & Grocery."} id={"bg"} />
      <SpecialDishes data={"Top Fashions."} id={"fs"} />
      <Footer />
    </div>
  );
};

export default Home;
