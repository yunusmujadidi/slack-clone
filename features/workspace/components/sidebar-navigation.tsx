"use client";

import { Bell, Home, MessagesSquare, MoreHorizontal } from "lucide-react";
import { SidebarButton } from "./sidebar-button";
import { usePathname } from "next/navigation";

export const SidebarNavigation = () => {
  const pathname = usePathname();
  return (
    <>
      <SidebarButton
        icon={Home}
        label="Home"
        isActive={pathname.includes("/")}
      />
      <SidebarButton icon={MessagesSquare} label="DMs" />
      <SidebarButton icon={Bell} label="Activity" />
      <SidebarButton icon={MoreHorizontal} label="More" />
    </>
  );
};
