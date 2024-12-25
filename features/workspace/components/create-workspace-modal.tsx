"use client";

import { Modal } from "@/components/modal";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import { CreateWorkspaceForm } from "../form/create-workspace-form";
import { usePathname } from "next/navigation";

export const CreateWorkspaceModal = () => {
  const { isOpen, onClose } = useCreateWorkspace();
  const pathname = usePathname();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        pathname === "/"
          ? "Let's get started with a new workspace "
          : "Create a new workspace"
      }
      description="Fill out the form below to create a new workspace."
    >
      <CreateWorkspaceForm onClose={onClose} />
    </Modal>
  );
};
