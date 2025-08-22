import React, { useEffect } from "react";
import useBookStore from "../stores/useBookStore";
import { useAuth } from "../context/AuthContextProvider";
import { Link } from "react-router-dom";

function MyLibrary() {
  const { fetchUserBook, loading, error, data } = useBookStore();
  const { session } = useAuth();
  useEffect(() => {
    if (session?.user?.id) {
      fetchUserBook(session.user.id);
    }
  }, [session]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error... {error}</div>;
  }
  return (
    <div className="flex flex-col">
      <h1 className="text-white text-center text-4xl my-12">
        {" "}
        Update or Delete your book !
      </h1>

      <div className="flex justify-center items-center">
        <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2">
          {data.map((book) => {
            return (
              <div key={book.id} className="mb-4">
                <Link to={`/update/${book.id}`}>
                  <img
                    src={book.image_url}
                    alt={book.title}
                    className="w-32 h-48 object-cover"
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

export default MyLibrary;
