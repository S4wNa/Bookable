import { useAuth } from "../../context/AuthContextProvider";
import FallingNav from "../Nav/FallingNav";
import HamburgerMenu from "../Nav/HamburgerMenu";

import Navou from "./GlobalNav";
import GlobalNav from "./GlobalNav";

function Layout({ children }) {
  const { session } = useAuth();

  return (
    <div className="overflow-hidden font-open w-full min-h-screen ">
      <div className="back -z-1" />

      {session && (
        <>
          <div className="  mx-16 sm:mx-42 justify-between items-center mt-12 flex z-50  ">
            <h1 className="text-3xl text-white font-fast cursor-pointer">
              Bookable
            </h1>
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
