import { create } from "zustand";

interface useCreateWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
}

export const useCreateWorkspace = create<useCreateWorkspaceProps>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
