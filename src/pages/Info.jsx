import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useBookStore from "../stores/useBookStore";
function Info() {
  const { currentBook, fetchBookById, loading, error } = useBookStore();
  const { id } = useParams();

  useEffect(() => {
    fetchBookById(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...{error}</div>;
  }
  return (
    <div className="flex justify-center items-center md:flex-row flex-col md:gap-4 lg:gap-16 mt-12 mx-auto max-w-4xl">
      <img
        alt="book"
        className="lg:w-120 mb-16 lg:h-140 w-70 md:w-80 sm:w-80 sm:h-100  md:h-120 lg:mx-0 md:mx-4 rounded-md"
        src={currentBook?.[0]?.image_url}
      />
      <div className="flex flex-col">
        <div className="flex mb-4">
          <div>
            <p className="text-[rgb(65,63,63)]">Title :</p>
            <p className="inp text-[rgb(65,63,63)] mr-8 p-2 rounded-md ">
              {currentBook?.[0]?.title}
            </p>
          </div>
          <div>
            <p className="text-[rgb(65,63,63)]">Author :</p>
            <p className="inp text-[rgb(65,63,63)] p-2  rounded-md">
              {currentBook?.[0]?.author}
            </p>
          </div>
        </div>
        <div>
          <p className="text-[rgb(65,63,63)]  ">ISBN-10 :</p>
          <p className="inp w-30 flex items-center justify-center text-[rgb(65,63,63)] p-2  rounded-md  mb-4">
            {currentBook?.[0]?.isbn}
          </p>
        </div>
        <div>
          <p className="text-[rgb(65,63,63)]">Description :</p>
          <p className="inp text-[rgb(65,63,63)] p-2 w-80 md:w-100 lg:w-full   rounded-md mb-4 ">
            {currentBook?.[0]?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Info;
