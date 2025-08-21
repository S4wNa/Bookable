import React from "react";
import HamburgerMenu from "./HamburgerMenu";
function MobileNavBar() {
  return (
    <div className="flex flex-col">
      <div className="mx-8 sm:hidden justify-between items-center mt-12 flex">
        <h1 className="text-3xl text-white font-fast cursor-pointer">
          Bookable
        </h1>
        <HamburgerMenu />
      </div>

      <button className=" mx-auto text-4xl mt-40 text-white font-bold mb-12  border-white active:border-b-2 ">
        Login
      </button>
      <button className=" mx-auto text-4xl text-white font-bold border-white  active:border-b-2">
        Sign up
      </button>
    </div>
  );
}

export default MobileNavBar;
