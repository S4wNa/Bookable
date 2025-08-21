import { create } from "zustand";

const useToggleStore = create((set) => ({
  showPassord: false,
  isOpen: false,
  isMobileOpen: false,

  togglePassword: () => set((state) => ({ showPassord: !state.showPassord })),

  toggleMenu: () => set((state) => ({ isOpen: !state.isOpen })),
  toggleMobileMenu: () =>
    set((state) => ({ isMobileOpen: !state.isMobileOpen })),
}));

export default useToggleStore;
