import React from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import MobileNavBar from "../compo/Nav/MobileNavBar";
import HamburgerMenu from "../compo/Nav/HamburgerMenu";
import FallingNav from "../compo/Nav/FallingNav";

import books from "../assets/books_images.png";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Home() {
  return (
    <div className="overflow-hidden font-open w-full h-screen flex justify-center items-center">
      <div className="back -z-1" />

      <div className="container mx-8 w-full h-full ">
        <div>
          <div className=" justify-between items-center mt-12 hidden sm:flex">
            <h1 className="text-3xl text-white font-fast cursor-pointer">
              Bookable
            </h1>
            <div className="flex items-center justify-center   ">
              <button
                className="text-white font-semibold transform
transition duration-300
ease-in-out  cursor-pointer hover:text-[#DF98C7]"
              >
                Login
              </button>
              <button
                className="text-white transform
transition duration-300
ease-in-out font-semibold cursor-pointer border-1 border-[#fff] ml-8 px-4 py-2 hover:bg-[#DF98C7] "
              >
                Sign up
              </button>
            </div>
          </div>
          <div className="hidden sm:flex mt-20">
            <div className="w-1/2  flex flex-col justify-center ">
              <h1 className="text-white text-7xl">
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
              <button className=" mt-5 rounded-full cursor-pointer hover:bg-[#f8d261] bg-[#f7d87c] w-40 px-6 transform active:scale-110 transition duration-300 ease-in-out text-lg   py-3 text-white">
                Get started
              </button>
            </div>
            <div className="w-1/2  flex items-center justify-center">
              <img
                alt="image of 3d book cartoon like"
                className=" md:w-80 md:h-80 lg:w-120 lg:h-120"
                src={books}
              />
            </div>
          </div>
        </div>
        <div className="mx-8 sm:hidden justify-between items-center mt-12 flex">
          <h1 className="text-3xl text-white font-fast cursor-pointer">
            Bookable
          </h1>
          <HamburgerMenu />
        </div>
      </div>
      <FallingNav className="sm:hidden block ">
        <MobileNavBar />
      </FallingNav>
    </div>
  );
}

export default Home;
