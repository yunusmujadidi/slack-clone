import { Button } from "@/components/ui/button";
import { Workspace } from "@prisma/client";
import { Info } from "lucide-react";

export const Toolbar = ({ workspace }: { workspace: Workspace }) => {
  return (
    <div className="z-10 w-full h-12 bg-[#3b0f3b] justify-between flex items-center p-1.5">
      <div className="flex-1" />
      <div className="w-10 grow-[2] shrink min-w-72 max-w-2xl">
        <Button className="bg-accent/25 hover:bg-accent/30 w-full h-8 px-2 justify-start">
          <span className="text-xs text-white">Search {workspace.name}</span>
        </Button>
      </div>
      <div className="ml-auto flex-1 flex justify-end items-center">
        <Button variant="transparent">
          <Info className="size-8 text-white" />
        </Button>
      </div>
    </div>
  );
};
