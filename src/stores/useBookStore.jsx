import { create } from "zustand";
import supabase from "../supabaseClient";

const useBookStore = create((set) => ({
  data: [],
  loading: false,
  error: null,
  currentBook: null,

  fetchData: async () => {
    set({ loading: true });

    try {
      const { data, error } = await supabase.from("books").select("*");

      if (error) {
        console.error("Supabase Error feetching", error.message);
        set({ error: error.message, loading: false });
        return;
      }
      console.log("Supabase data fetching success", data);
      set({ data: data, loading: false, error: null });
    } catch (error) {
      console.error("Unexpected Error while fetching", error.message);
      set({ error: error.message, loading: false });
    }
  },

  fetchBookById: async (bookId) => {
    set({ loading: true });

    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("id", bookId);

      if (error) {
        console.error(
          "Supabase error trying fetching book by id",
          error.message
        );
        set({ error: error.message, loading: false });
        return;
      }
      set({ currentBook: data, loading: false, error: null });
    } catch (error) {
      console.error("Unexpected error trying to fetch book by id");
      set({ error: error.message, loading: false });
    }
  },

  addBook: async (book) => {
    set({ loading: true });

    try {
      const { data: existingBooks, error: checkError } = await supabase
        .from("books")
        .select("id")
        .eq("isbn", book.isbn);

      if (checkError) {
        set({ error: checkError.message, loading: false });
        return;
      }

      if (existingBooks.length > 0) {
        set({ error: "This ISBN already exists", loading: false });
        return;
      }

      let imageUrl = null;

      if (book.imageFile) {
        const fileExt = book.imageFile.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("book-images")
          .upload(fileName, book.imageFile);

        if (uploadError) {
          throw uploadError;
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("book-images").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const bookToInsert = {
        title: book.title,
        author: book.author,
        description: book.description,
        image_url: imageUrl,
        isbn: book.isbn,
        user_id: book.user_id,
      };

      const { data, error } = await supabase.from("books").insert(bookToInsert);
      if (error) {
        console.error("Supabase error trying adding book", error.message);
        set({ error: error.message, loading: false });
        return;
      }
      set({ loading: false, error: null });
    } catch (error) {
      console.error("Unexpected error trying adding book");
      set({ error: error.message, loading: false });
    }
  },

  fetchUserBook: async (userId) => {
    set({ loading: true });

    try {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error(
          "Supabase error trying to fetch user books",
          error.message
        );
        set({ loading: false, error: error.message });
        return;
      }

      set({ data: data, loading: false, error: null });
    } catch (error) {
      console.error(
        "Unpexpected Error trying fetching user's book",
        error.message
      );
      set({ loading: false, error: error.message });
    }
  },
  updateBook: async (bookId, book) => {
    console.log("updateBook called with:", { bookId, book });
    set({ loading: true });

    try {
      const { data: existingBooks, error: checkError } = await supabase
        .from("books")
        .select("id")
        .eq("isbn", book.isbn)
        .neq("id", bookId); // Important: exclure le livre actuel

      if (checkError) {
        set({ error: checkError.message, loading: false });
        return;
      }

      if (existingBooks.length > 0) {
        set({
          error: "This ISBN is already used by another book",
          loading: false,
        });
        return;
      }

      let imageUrl = book.image_url;
      if (book.imageFile) {
        const fileExt = book.imageFile.name.split(".").pop();
        const fileName = `${Date.now()}_${Math.random()
          .toString(36)
          .substring(2)}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("book-images")
          .upload(fileName, book.imageFile);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("book-images").getPublicUrl(fileName);

        imageUrl = publicUrl;
      }

      const bookToUpdate = {
        title: book.title,
        author: book.author,
        description: book.description,
        image_url: imageUrl,
        isbn: book.isbn,
      };

      const { data, error } = await supabase
        .from("books")
        .update(bookToUpdate)
        .eq("id", bookId)
        .eq("user_id", book.user_id);
      console.log("Update response:", { data, error });
      if (error) {
        console.error(
          "Supabase error trying updating user's book",
          error.message
        );
        set({ error: error.message, loading: false });
        return;
      }
      console.log("Update successful");
      set({ loading: false, error: null });
    } catch (error) {
      console.error("Unexpected error trying updating user's book");
      set({ error: error.message, loading: false });
    }
  },

  deleteBook: async (bookId, userId) => {
    console.log("deleteBook called with:", { bookId, userId });
    set({ loading: true });

    try {
      console.log("Attempting to delete from Supabase...");
      const { data, error } = await supabase
        .from("books")
        .delete()
        .eq("id", bookId)
        .eq("user_id", userId);

      console.log("Supabase delete response:", { data, error });

      if (error) {
        console.error(
          "Supabase error trying deleting user's book",
          error.message
        );
        return;
      }

      console.log("Delete successful");
      set((state) => ({
        data: state.data.filter((book) => book.id !== bookId),
        loading: false,
        error: null,
      }));
    } catch (error) {
      console.error("Unexpected error trying deleting user's book", error);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBookStore;
