import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ImageUpload from "../compo/ImageUpload";
import useBookStore from "../stores/useBookStore";
import { useAuth } from "../context/AuthContextProvider";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { updateBook, deleteBook, fetchBookById, currentBook, loading, error } =
    useBookStore();
  const { session } = useAuth();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBookById(id);
    }
  }, [id]);

  useEffect(() => {
    if (currentBook && currentBook[0]) {
      const book = currentBook[0];
      setTitle(book.title || "");
      setAuthor(book.author || "");
      setIsbn(book.isbn || "");
      setDescription(book.description || "");
    }
  }, [currentBook]);
  const handleDelete = async () => {
    console.log("Delete attempted for book ID:", id);
    const bookTitle = currentBook?.[0]?.title || "this book";
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${bookTitle}"? This action cannot be undone.`
    );

    if (confirmDelete) {
      await deleteBook(id, session?.user?.id);
      alert("Book deleted successfully!");
      navigate("/mylibrary");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Update submitted with data:", {
      title,
      author,
      isbn,
      description,
    });

    if (!title.trim()) {
      alert("Book title is required!");
      return;
    }
    if (!author.trim()) {
      alert("Author is required!");
      return;
    }
    if (!isbn.trim()) {
      alert("ISBN is required!");
      return;
    }
    if (!description.trim()) {
      alert("Description is required!");
      return;
    }

    const bookData = {
      title: title.trim(),
      author: author.trim(),
      isbn: isbn.trim(),
      description: description.trim(),
      imageFile,
      image_url: currentBook?.[0]?.image_url,
      user_id: session?.user?.id,
    };
    console.log("Calling updateBook with:", bookData);
    await updateBook(id, bookData);
    console.log("Update completed");
    navigate("/mylibrary");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error... {error}</div>;

  return (
    <div className="form max-w-xs my-12 sm:max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Update Book</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Book Title
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter book title..."
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none text-[rgb(65,63,63)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Author
          </label>
          <input
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="Enter author name..."
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none text-[rgb(65,63,63)]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            ISBN-10
          </label>
          <input
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            type="text"
            maxLength={10}
            placeholder="Enter ISBN..."
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none text-[rgb(65,63,63)]"
          />
        </div>

        <ImageUpload onImageUpload={setImageFile} />

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none resize-none text-[rgb(65,63,63)]"
          />
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleSubmit}
            className="w-full cursor-pointer bg-[#A9B3E9] text-white py-2 px-4 rounded-md transition-colors"
          >
            Update Book
          </button>

          <button
            onClick={handleDelete}
            className="w-full cursor-pointer bg-[#F191B3] text-white py-2 px-4 rounded-md transition-colors"
          >
            Delete Book
          </button>
        </div>
      </div>
    </div>
  );
}

export default Update;
