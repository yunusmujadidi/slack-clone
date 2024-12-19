import { create } from "zustand";

interface useCreateWorkspaceFirstProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCreateWorkspaceFirst = create<useCreateWorkspaceFirstProps>(
  (set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
  })
);
