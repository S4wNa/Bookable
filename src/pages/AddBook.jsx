import React, { useState } from "react";
import ImageUpload from "../compo/ImageUpload";
import useBookStore from "../stores/useBookStore";
import { useAuth } from "../context/AuthContextProvider";

function AddBook() {
  const { addBook } = useBookStore();
  const { session } = useAuth();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [isbn, setIsbn] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    if (!imageFile) {
      alert("Book cover image is required!");
      return;
    }

    alert("Book would be added to the library!");
    const book = {
      title,
      author,
      isbn,
      description,
      imageFile,
      user_id: session?.user?.id,
    };
    addBook(book);
    setTitle("");
    setAuthor("");
    setIsbn("");
    setDescription("");
    setImageFile(null);
  };

  return (
    <div className="form max-w-xs sm:max-w-md my-12 mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-white">Add a New Book</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Book Title
          </label>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter book title..."
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none text-[rgb(65,63,63)] "
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Author
          </label>
          <input
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            type="text"
            placeholder="Enter author name..."
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none text-[rgb(65,63,63)] "
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            ISBN-10
          </label>
          <input
            required
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            type="text"
            maxLength={10}
            placeholder="Enter ISBN..."
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none text-[rgb(65,63,63)] "
          />
        </div>

        <ImageUpload onImageUpload={setImageFile} />

        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700">
            Description
          </label>
          <textarea
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter book description..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-500 rounded-md outline-none  resize-none text-[rgb(65,63,63)]"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full cursor-pointer bg-[rgba(255,255,255,0.5)] text-red py-2 px-4 rounded-md  transition-colors"
        >
          Add Book
        </button>
      </div>
    </div>
  );
}

export default AddBook;
