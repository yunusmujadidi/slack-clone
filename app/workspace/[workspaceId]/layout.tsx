import { getWorkspace } from "@/features/workspace/actions/get-workspace";
import { AppSidebar } from "@/features/workspace/components/app-sidebar";
import { Toolbar } from "@/features/workspace/components/toolbar";
import { redirect } from "next/navigation";
import React from "react";

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
}) {
  const { workspaceId } = await params;

  const workspace = await getWorkspace({ workspaceId: workspaceId });
  if (!workspace) {
    redirect("/");
  }
  return (
    <div className="fixed inset-0 flex flex-col">
      <Toolbar workspace={workspace} />
      <div className="flex-1 flex overflow-hidden">
        <AppSidebar workspace={workspace} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
