"use server";

import { getCurrentUser } from "@/features/auth/actions/get-current-user";
import { prisma } from "@/lib/prisma";

export const createWorkspace = async ({ name }: { name: string }) => {
  const currentUser = await getCurrentUser();
  if (!currentUser || !currentUser.id) {
    throw new Error("Unauthorized");
  }
  try {
    const result = await prisma.workspace.create({
      data: {
        name,
        joinCode: "12345",
        userId: currentUser.id,
      },
    });

    return {
      success: true,
      message: `Successfully created workspace "${result.name}"`,
      result,
    };
  } catch (error) {
    console.log(error);
    return { message: "Something went wrong" };
  }
};
