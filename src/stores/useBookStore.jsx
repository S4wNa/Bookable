import { create } from "zustand";
import supabase from "../supabaseClient";

const useBookStore = create((set) => ({
  data: [],
  loading: false,
  error: null,

  fetchData: async () => {
    set({ loading: true });

    try {
      const { data, error } = await supabase.from("books").select("*");

      if (error) {
        console.error("Supabase Error feetching", error.message);
        set({ error: error.message, loading: false });
      }
      console.log("Supabase data fetching success", data);
      set({ data: data, loading: false, error: null });
    } catch (error) {
      console.error("Unexpected Error while fetching", error.message);
      set({ error: error.message, loading: false });
    }
  },
}));

export default useBookStore;
