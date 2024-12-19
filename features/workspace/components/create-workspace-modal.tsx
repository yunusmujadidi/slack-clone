"use client";

import { Modal } from "@/components/modal";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import { CreateWorkspaceForm } from "../form/create-workspace-form";

export const CreateWorkspaceModal = () => {
  const { isOpen, onClose } = useCreateWorkspace();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create a new workspace"
      description="Fill out the form below to create a new workspace."
    >
      <CreateWorkspaceForm onClose={onClose} />
    </Modal>
  );
};
