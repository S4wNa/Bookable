import React from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import HamburgerMenu from "../compo/Nav/HamburgerMenu";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

function Home() {
  return (
    <div className="overflow-hidden font-open w-full h-screen flex justify-center items-center">
      <div className="back -z-1" />

      <div className="container  w-full h-full ">
        <div className=" justify-between items-center mt-12 hidden sm:flex">
          <h1 className="text-3xl text-white font-fast cursor-pointer">
            Bookable
          </h1>
          <div className="flex items-center justify-center   ">
            <button className="text-white font-semibold  cursor-pointer hover:text-[#DF98C7]">
              Login
            </button>
            <button className="text-white font-semibold cursor-pointer border-1 border-[#fff] ml-8 px-4 py-2 hover:bg-[#DF98C7] ">
              Sign up
            </button>
          </div>
        </div>
        <div className="mx-8 sm:hidden justify-between items-center mt-12 flex">
          <h1 className="text-3xl text-white font-fast cursor-pointer">
            Bookable
          </h1>
          <HamburgerMenu />
        </div>
      </div>
    </div>
  );
}

export default Home;
