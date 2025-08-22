import React, { useEffect } from "react";

import useBookStore from "../stores/useBookStore";

function MainLibrary() {
  const { data, loading, error, fetchData } = useBookStore();

  useEffect(() => {
    console.log("useEffect déclenché");
    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">Error...{error}</div>;

  console.log("Premier livre:", data[0]);
  console.log("Data length:", data.length);
  console.log("Data content:", data);
  console.log("Loading:", loading);
  console.log("Error:", error);
  return (
    <div className="container mx-auto flex flex-col w-full h-full">
      <h1 className=" w-full flex justify-center text-white text-xl font-semibold">
        Discover
      </h1>
      <div>
        <input placeholder="Search any book..." />
        <button>Search</button>
      </div>
      <div className="flex justify-between items-center">
        <h1>Book Recomendations</h1>
        <h1>View all</h1>
      </div>
      <div>
        {data.slice(0, 4).map((book) => (
          <div key={book.id}>
            <h3>{book.title}</h3>
            <p>Par {book.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MainLibrary;
