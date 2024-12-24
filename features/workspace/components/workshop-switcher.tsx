"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Workspace } from "@prisma/client";
import { useCreateWorkspace } from "../hooks/use-create-workspace";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";

export const WorkshopSwitcer = ({
  workspace,
  workspaces,
}: {
  workspace: Workspace;
  workspaces: Workspace[];
}) => {
  const { onOpen } = useCreateWorkspace();
  const router = useRouter();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="size-9 bg-gray-500 hover:bg-gray-500/80 transition">
          <span className="text-slate-800 text-xl font-semibold">
            {workspace.name.charAt(1).toUpperCase()}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="start"
        className="w-64 px-2 py-3"
      >
        <div className="flex flex-col justify-center space-y-2 p-2">
          <div>
            <h1 className="font-semibold ">{workspace.name} Workspace</h1>
            <p className="text-gray-500 text-sm ">Active Workspace</p>
          </div>
          <div></div>
        </div>
        {workspaces
          .filter((item) => item.id !== workspace.id)
          .map((item) => (
            <DropdownMenuItem
              key={item.id}
              className="cursor-pointer"
              onClick={() => router.push(`/workspace/${item.id}`)}
            >
              <div className="size-9 bg-gray-500 transition flex items-center justify-center">
                <span className="text-slate-200 text-xl font-semibold">
                  {item.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="truncate">{item.name}</span>
            </DropdownMenuItem>
          ))}
        <Separator className="my-2" />
        <DropdownMenuItem className="cursor-pointer" onClick={() => onOpen()}>
          <div className="size-9 bg-gray-100 items-center justify-center flex">
            <span className="text-slate-200 text-xl font-semibold">
              <Plus className="text-black" />
            </span>
          </div>
          <span className="font-semibold text-sm">Create a new workspace</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
