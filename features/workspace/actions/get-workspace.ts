"use server";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { prisma } from "@/lib/prisma";

export const getWorkspace = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    throw new Error("Unauthorized");
  }

  return await prisma.workspace.findFirst({
    where: {
      userId: currentUser.id,
    },
  });
};
