import { getWorkspace } from "@/features/workspace/actions/get-workspace";
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

  const workspace = await getWorkspace({ id: workspaceId });
  if (!workspace) {
    redirect("/");
  }
  return (
    <>
      <Toolbar workspace={workspace} />
      {children}
    </>
  );
}
