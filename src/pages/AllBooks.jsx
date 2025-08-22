// import React, { useEffect } from "react";
// import useBookStore from "../stores/useBookStore";
// import { Link } from "react-router-dom";

// function AllBooks() {
//   const { data, loading, error, fetchData } = useBookStore();

//   useEffect(() => {
//     console.log("useEffect déclenché");
//     fetchData();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div className="text-red-500">Error...{error}</div>;

//   return (
//     <div className="container mx-auto flex flex-col w-full overlow-y-auto min-h-screen   ">
//       <h1 className=" my-12 w-full flex justify-center text-white text-2xl font-semibold">
//         Discover
//       </h1>
//       <div className=" mb-18 search flex justify-center sm:min-w-xl md:min-w-2xl p-2 md:p-4 items-center mx-auto ">
//         <input
//           placeholder="Search any book..."
//           className="w-full outline-none"
//         />
//         <button className=" search-btn w-1/3 cursor-pointer p-2 rounded-lg text-[rgb(65,63,63)] ">
//           Search
//         </button>
//       </div>

//       <div className="flex justify-center items-center">
//         <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2  mx-auto sm:gap-4">
//           {data.map((book) => (
//             <div key={book.id} className="w-40 h-60 mx-6 mb-4">
//               <Link to={`/book/${book.id}`}>
//                 <img
//                   src={book.image_url}
//                   className="h-full w-full rounded-md cursor-pointer"
//                 />
//               </Link>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AllBooks;
import React, { useEffect, useState } from "react";
import useBookStore from "../stores/useBookStore";
import { Link } from "react-router-dom";

function AllBooks() {
  const { data, loading, error, fetchData, searchBooks } = useBookStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    console.log("useEffect déclenché");
    fetchData();
  }, []);

  // Logique de recherche en temps réel
  useEffect(() => {
    const search = async () => {
      if (searchQuery.trim().length < 2) {
        setSearchResults([]);
        return;
      }

      setIsSearching(true);
      const { data } = await searchBooks(searchQuery);
      setSearchResults(data || []);
      setIsSearching(false);
    };

    const debounceTimer = setTimeout(search, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchBooks]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error...{error}</div>;

  return (
    <div className="container mx-auto flex flex-col w-full overlow-y-auto min-h-screen">
      <h1 className="my-12 w-full flex justify-center text-white text-2xl font-semibold">
        Discover
      </h1>

      <div className="mb-18 search flex justify-center sm:min-w-xl md:min-w-2xl p-2 md:p-4 items-center mx-auto relative">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search any book..."
          className="w-full outline-none"
        />
        <button className="search-btn w-1/3 cursor-pointer p-2 rounded-lg text-[rgb(65,63,63)]">
          Search
        </button>

        {/* Dropdown des résultats de recherche */}
        {searchQuery.length >= 2 && (
          <div className="absolute top-full left-2 right-2 md:left-4 md:right-4 bg-white border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto mt-1">
            {isSearching ? (
              <div className="p-3 text-gray-500">Searching...</div>
            ) : searchResults.length > 0 ? (
              searchResults.map((book) => (
                <Link
                  key={book.id}
                  to={`/book/${book.id}`}
                  className="block p-3 hover:bg-gray-100 border-b last:border-b-0"
                  onClick={() => {
                    setSearchQuery("");
                    setSearchResults([]);
                  }}
                >
                  <div className="font-medium text-gray-800">{book.title}</div>
                  <div className="text-sm text-gray-600">by {book.author}</div>
                  <div className="text-xs text-gray-400">ISBN: {book.isbn}</div>
                </Link>
              ))
            ) : (
              <div className="p-3 text-gray-500">No results found</div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 mx-auto sm:gap-4">
          {data.map((book) => (
            <div key={book.id} className="w-40 h-60 mx-6 mb-4">
              <Link to={`/book/${book.id}`}>
                <img
                  src={book.image_url}
                  alt={book.title}
                  className="h-full w-full rounded-md cursor-pointer"
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllBooks;
