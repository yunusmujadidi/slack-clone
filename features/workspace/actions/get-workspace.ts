"use server";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { prisma } from "@/lib/prisma";

export const getWorkspace = async ({ id }: { id?: string } = {}) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return prisma.workspace.findFirst({
    where: {
      userId: currentUser.id,
      ...(id && { id }),
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
