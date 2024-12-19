"use client";

import { CreateWorkspaceModalFirst } from "@/features/workspace/components/create-workspace-modal-first";
import { useCreateWorkspace } from "@/features/workspace/hooks/use-create-workspace";

import { useEffect } from "react";

export const HomeClient = () => {
  const { isOpen, onOpen } = useCreateWorkspace();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);
  return <CreateWorkspaceModalFirst />;
};
