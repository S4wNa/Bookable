import React from "react";

import HamburgerMenu from "../Nav/HamburgerMenu";
function GlobalNav() {
  return (
    <div className="flex flex-col z-100">
      <div className=" mx-16 sm:mx-42  justify-between items-center mt-12 flex">
        <h1 className="text-3xl text-white font-fast cursor-pointer">
          Bookable
        </h1>
        <HamburgerMenu />
      </div>

      <button className=" mx-auto text-4xl mt-40 text-white font-bold mb-12  border-white active:border-b-2 ">
        LoginSigma
      </button>
      <button className=" mx-auto text-4xl text-white font-bold border-white  active:border-b-2">
        Sigma
      </button>
    </div>
  );
}

export default GlobalNav;
