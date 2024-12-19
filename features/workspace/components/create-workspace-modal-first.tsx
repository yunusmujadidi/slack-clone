"use client";

import { Modal } from "@/components/modal";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import { CreateWorkspaceForm } from "../form/create-workspace-form";

export const CreateWorkspaceModalFirst = () => {
  const { isOpen, onClose } = useCreateWorkspace();
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="First, create a new workspace"
      description="Fill out the form below to continue."
    >
      <CreateWorkspaceForm onClose={onClose} />
    </Modal>
  );
};
