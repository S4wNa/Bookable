import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useBookStore from "../stores/useBookStore";

function MainLibrary() {
  const { data, loading, error, fetchData } = useBookStore();

  useEffect(() => {
    console.log("useEffect déclenché");
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error...{error}</div>;

  // console.log("Premier livre:", data[0]);
  // console.log("Data length:", data.length);
  // console.log("Data content:", data);
  // console.log("Loading:", loading);
  // console.log("Error:", error);
  return (
    <div className="container mx-auto flex flex-col w-full h-full  ">
      <h1 className=" my-12 w-full flex justify-center text-white text-2xl font-semibold">
        Discover
      </h1>
      <div className=" mb-18 search flex justify-center sm:min-w-xl md:min-w-2xl min-w-xs px-4 py-2  sm:p-2 md:p-4 items-center mx-auto  ">
        <input
          placeholder="Search any book..."
          className="w-full outline-none"
        />
        <button className=" search-btn w-1/3 cursor-pointer p-2 rounded-lg text-[rgb(65,63,63)] ">
          Search
        </button>
      </div>
      <div className="flex justify-between items-center mb-24 mx-14">
        <h1 className="text-[rgb(65,63,63)] text-xl font-normal">
          Book Recomendations
        </h1>
        <Link to="/viewall">
          <button className="text-[rgba(255,255,255,0.5)] active:text-[rgba(255,255,255,0.2)]">
            View all
          </button>
        </Link>
      </div>
      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-5 sm:grid-cols-3">
          {data.slice(0, 5).map((book) => {
            console.log("Book ID:", book.id);
            return (
              <div key={book.id} className="w-40 h-60 mx-6 mb-6">
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.image_url}
                    className="h-full w-full rounded-md cursor-pointer"
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default MainLibrary;
