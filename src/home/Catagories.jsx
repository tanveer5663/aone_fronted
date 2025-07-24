
import { Link } from "react-router-dom";


const categoryItems = [
  {
    id: 1,
    title: "Mobiles",
    image: "./images/22fddf3c7da4c4f4.webp",
    link: "mobiles",
  },
  {
    id: 2,
    title: "Appliances",
    image: "./images/0139228b2f7eb413-PhotoRoom.png-PhotoRoom.png",
    link: "appliances",
  },
  {
    id: 3,
    title: "Electronics",
    image: "./images/69c6589653afdb9a.webp",
    link: "electronics",
  },
  {
    id: 4,
    title: "Fashion",
    image: "./images/0d75b34f7d8fbcb3.png",
    link: "fashions",
  },
  {
    id: 5,
    title: "Fruits",
    image: "./images/category__1-PhotoRoom.png-PhotoRoom.png",
    link: "fruits",
  },
  {
    id: 6,
    title: "Vegtables",
    image: "./images/category__2-PhotoRoom.png-PhotoRoom.png",
    link: "vegetables",
  },
  {
    id: 7,
    title: "Beverages",
    image: "./images/category__7-PhotoRoom.png-PhotoRoom.png",
    link: "beverages",
  },
  {
    id: 7,
    title: "Grocery",
    image: "./images/29327f40e9c4d26b.webp",
    link: "grocery",
  },
];
//

const Catagories = () => {
 
  return (
    <>
      <div className="text-center mt-5">
        <p className="text-3xl md:text-3xl md:leading-snug font-bold my-2 ">
          Popular Catagories
        </p>
      </div>
      <div className="flex mt-6 justify-center">
        <div className="flex flex-wrap gap-5  container w-4/5 place-content-center ">
          {categoryItems.map((item, i) => (
            <Link to={item.link} key={i}>
              <div className="shadow-lg flex rounded-md   py-2  w-72   bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-200    cursor-pointer hover:-translate-y-2 transition-all duration-300 z-10">
                <div className=" mx-6 ">
                  <img
                    src={item.image}
                    alt=""
                    className="bg-[#C1F1C6] p-2 rounded-full w-28 h-28"
                  />
                </div>
                <div className="mt-5 space-y-1    ">
                  <h5 className="text-[#1E1E1E] font-semibold mt-5 ">
                    {item.title}
                  </h5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Catagories;
