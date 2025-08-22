import { useAuth } from "../../context/AuthContextProvider";
import FallingNav from "../Nav/FallingNav";
import HamburgerMenu from "../Nav/HamburgerMenu";
import { Link } from "react-router-dom";
import GlobalNav from "./GlobalNav";

function Layout({ children }) {
  const { session } = useAuth();

  return (
    <div className="overflow-x-hidden font-open w-full min-h-screen ">
      <div className="back -z-1" />

      {session && (
        <>
          <div className="  mx-16 sm:mx-42 justify-between items-center mt-24 flex z-50  ">
            <Link to="/">
              <h1 className="text-3xl text-white font-fast cursor-pointer">
                Bookable
              </h1>
            </Link>
            <HamburgerMenu />
          </div>

          <FallingNav>
            <GlobalNav />
          </FallingNav>
        </>
      )}

      <main className={""}>{children}</main>
    </div>
  );
}

export default Layout;
