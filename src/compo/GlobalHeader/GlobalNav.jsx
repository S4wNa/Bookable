import React from "react";
import { Link } from "react-router-dom";
import HamburgerMenu from "../Nav/HamburgerMenu";
import useToggleStore from "../../stores/useToggleStore";
import { useAuth } from "../../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
function GlobalNav() {
  const { toggleMenu } = useToggleStore();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const items = [
    {
      title: "Home",
      path: "/mainlibrary",
    },
    {
      title: "View All",
      path: "/viewall",
    },
    {
      title: "Add a book",
      path: "/addbook",
    },
    {
      title: "My library",
      path: "/mylibrary",
    },
  ];
  return (
    <div className="flex flex-col z-100">
      <div className=" mx-16 sm:mx-42  justify-between items-center mt-12 mb-28 flex">
        <Link to="/">
          <h1 className="text-3xl text-white font-fast cursor-pointer">
            Bookable
          </h1>
        </Link>
        <HamburgerMenu />
      </div>
      <div className="flex flex-col items-center justify-start">
        {items.map((it, i) => (
          <Link key={i} to={`${it.path}`}>
            <button
              onClick={() => toggleMenu()}
              className="cursor-pointer mx-auto text-4xl md:text-6xl text-white font-bold mb-12  border-white active:border-b-2 "
            >
              {it.title}
            </button>
          </Link>
        ))}
      </div>

      <button
        onClick={async () => {
          const confirm = window.confirm("Are you sure to log out ?");
          if (confirm) {
            await signOut();
            toggleMenu();
            navigate("/");
          }
        }}
        className="cursor-pointer mx-auto  text-4xl md:text-6xl text-white font-bold border-white  active:border-b-2"
      >
        Log Out
      </button>
    </div>
  );
}

export default GlobalNav;
