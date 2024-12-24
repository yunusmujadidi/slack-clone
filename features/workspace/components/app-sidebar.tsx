import { Workspace } from "@prisma/client";
import { WorkshopSwitcer } from "./workshop-switcher";
import { getWorkspaces } from "../actions/get-workspace";

import { SidebarNavigation } from "./sidebar-navigation";

export const AppSidebar = async ({ workspace }: { workspace: Workspace }) => {
  const workspaces = await getWorkspaces();
  return (
    <div className="h-screen w-16 p-2 bg-gradient-to-b from-[#3C1042] to-[#270528] flex flex-col gap-7 items-center">
      <WorkshopSwitcer workspaces={workspaces} workspace={workspace} />
      <SidebarNavigation />
    </div>
  );
};
