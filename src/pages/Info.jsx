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
    <div>
      <img alt="book" className="w-40 h-60" src={currentBook?.[0]?.image_url} />
      <p>{currentBook?.[0]?.title}</p>
      <p>{currentBook?.[0]?.author}</p>
      <p>{currentBook?.[0]?.description}</p>
      <p>{currentBook?.[0]?.isbn}</p>
    </div>
  );
}

export default Info;
