import React from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MobileNavBar from "../compo/Nav/MobileNavBar";
import HamburgerMenu from "../compo/Nav/HamburgerMenu";
import FallingNav from "../compo/Nav/FallingNav";
import { Link } from "react-router-dom";
import books from "../assets/books_images.png";
import { useAuth } from "../context/AuthContextProvider";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Home() {
  const { session } = useAuth();

  return (
    <div className="overflow-hidden font-open w-full h-screen flex justify-center items-center">
      <div className="back -z-1" />

      <div className="container mx-8 w-full h-full ">
        <div>
          {!session && (
            <div className=" justify-between items-center mt-24 hidden sm:flex">
              <h1 className="text-3xl text-white font-fast cursor-pointer">
                Bookable
              </h1>
              <div className="flex items-center justify-center   ">
                <Link to="/login">
                  <button
                    className="text-white font-semibold transform
                  transition duration-300
                  ease-in-out  cursor-pointer hover:text-[#DF98C7]"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    className="text-white transform
                  transition duration-300
                  ease-in-out font-semibold cursor-pointer border-1 border-[#fff] ml-8 px-4 py-2 hover:bg-[#DF98C7] "
                  >
                    Sign up
                  </button>
                </Link>
              </div>
            </div>
          )}
          <div className="hidden md:flex md:flex-row sm:flex-col sm:flex mt-20 md:mt-50 lg:mt-20">
            <div className=" md:w-1/2 flex flex-col justify-center md:items-start sm:items-center  sm:text-center md:text-left mb-12">
              <h1 className="text-white lg:text-7xl md:text-5xl sm:text-5xl sm:text ">
                Make your <span className="font-fast">Own</span> Library
                <br />
                <span className="font-fast">with</span> few click
                <br />
                no more time <span className="font-fast">Wasted</span>
              </h1>
              <p className="text-white  text-lg mt-7">
                Get the book that fits you with our
                <br /> recommendation system
              </p>
              <Link to="/signup">
                <button className=" mt-5 rounded-full cursor-pointer hover:bg-[#f8d261] bg-[#f7d87c] w-40 px-6 transform active:scale-110 transition duration-300 ease-in-out text-lg   py-3 text-white">
                  Get started
                </button>
              </Link>
            </div>
            <div className=" md:w-1/2 flex items-center justify-center">
              <img
                alt="image of 3d book cartoon like"
                className=" sm:w-80 sm:h-80 s  lg:w-110 lg:h-110 xl:w-120 xl:h-120 "
                src={books}
              />
            </div>
          </div>
        </div>
        {!session && (
          <div className="flex flex-col sm:hidden">
            <div className="mx-8  justify-between items-center mt-12 flex ">
              <h1 className="text-3xl text-white font-fast cursor-pointer">
                Bookable
              </h1>
              <HamburgerMenu />
            </div>
            <div className=" flex flex-col text-center mt-16">
              <h1 className="text-white text-3xl ">
                Make your <span className="font-fast">Own</span> Library
                <br />
                <span className="font-fast">with</span> few click
                <br />
                no more time <span className="font-fast">Wasted</span>
              </h1>
              <p className="text-white  text-lg mt-7">
                Get the book that fits you with our
                <br /> recommendation system
              </p>
              <Link to="/signup">
                <button className=" mt-5 rounded-full cursor-pointer active:bg-[#f8d261] bg-[#f7d87c] w-40 px-6 transform active:scale-110 transition duration-300 ease-in-out text-lg   py-3 text-white">
                  Get started
                </button>
              </Link>
            </div>
            <div className="mx-auto mt-12 w-50 h-50 flex items-center justify-center">
              <img
                alt="image of 3d book cartoon like"
                className=" w-full h-full"
                src={books}
              />
            </div>
          </div>
        )}
      </div>
      {!session && (
        <FallingNav className="sm:hidden block ">
          <MobileNavBar />
        </FallingNav>
      )}
    </div>
  );
}

export default Home;
