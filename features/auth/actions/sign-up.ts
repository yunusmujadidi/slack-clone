"use server";

import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

export const SignUp = async ({
  email,
  password,
  name,
}: {
  email: string;
  password: string;
  name: string;
}) => {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return { message: "User with this email already exists" };
    }
    const hashPassword = await hash(password, 10);
    await prisma.user.create({
      data: {
        email,
        name,
        password: hashPassword,
      },
    });

    return { message: "User created successfully" };
  } catch (error) {
    console.error(error);
    return { message: "Something went wrong" };
  }
};
