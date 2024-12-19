"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getInitialName } from "@/lib/utils";
import { LogOut } from "lucide-react";
import { User } from "next-auth";
import { SignOut } from "../actions/signout";

export const UserButton = ({ user }: { user: User | undefined }) => {
  const fallback = getInitialName(user?.name ?? "User");
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.image ?? ""} alt="avatar image" />
          <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="w-60">
        <form
          action={() => {
            SignOut();
          }}
        >
          <button className="w-full" type="submit">
            <DropdownMenuItem className="cursor-pointer">
              <LogOut className="mr-2" /> Logout
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
