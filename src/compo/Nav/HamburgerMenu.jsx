import React from "react";
import useToggleStore from "../../stores/useToggleStore";
function HamburgerMenu() {
  const { isMobileOpen, isOpen, toggleMenu, toggleMobileMenu } =
    useToggleStore();
  return (
    <>
      <div
        onClick={() => {
          toggleMenu();
          toggleMobileMenu();
        }}
        className="flex flex-col cursor-pointer z-50"
      >
        <span
          className={`h-0.5 w-8 bg-white mb-2 transform transition duration-300 ease-in-out ${
            isMobileOpen || isOpen ? "rotate-45 translate-y-2" : ""
          } `}
        ></span>
        <span
          className={`h-0.5 w-8 bg-white mb-2 transform transition duration-300 ease-in-out  ${
            isMobileOpen || isOpen ? "opacity-0" : "opacity-100"
          } `}
        ></span>
        <span
          className={`h-0.5 w-8 bg-white mb-2 transform transition duration-300 ease-in-out  ${
            isMobileOpen || isOpen ? "-rotate-45 -translate-y-3" : ""
          } `}
        ></span>
      </div>
    </>
  );
}

export default HamburgerMenu;
