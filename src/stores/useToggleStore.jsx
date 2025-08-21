import { create } from "zustand";

const useToggleStore = create((set) => ({
  isOpen: false,
  isMobileOpen: false,

  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));

export default useToggleStore;
