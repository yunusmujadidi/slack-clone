"use server";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { prisma } from "@/lib/prisma";

export const getWorkspace = async ({
  workspaceId: workspaceId,
}: { workspaceId?: string } = {}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return prisma.workspace.findFirst({
    where: {
      userId: currentUser.id,
      ...(workspaceId && { id: workspaceId }),
    },
  });
};

export const getFirstWorkspace = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return prisma.workspace.findFirst({
    where: {
      userId: currentUser.id,
    },
  });
};

export const getWorkspaces = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return prisma.workspace.findMany({
    where: {
      userId: currentUser.id,
    },
  });
};
