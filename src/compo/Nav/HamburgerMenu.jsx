import React from "react";

function HamburgerMenu() {
  return (
    <>
      <div className="flex flex-col cursor-pointer">
        <span className="h-0.5 w-8 bg-white mb-2"></span>
        <span className="h-0.5 w-8 bg-white mb-2 "></span>
        <span className="h-0.5 w-8 bg-white  mb-2"></span>
      </div>
    </>
  );
}

export default HamburgerMenu;
