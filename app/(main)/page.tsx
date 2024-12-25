"use client";

import { useCreateWorkspace } from "@/features/workspace/hooks/use-create-workspace";

import { useEffect } from "react";

const Home = () => {
  const { isOpen, onOpen } = useCreateWorkspace();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [onOpen, isOpen]);
  return <></>;
};

export default Home;
