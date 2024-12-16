"use server";

import { signIn } from "@/auth";
import { toast } from "sonner";

export const SignInGoogle = async () => {
  await signIn("google");
};

export const SignInGithub = async () => {
  await signIn("github");
};

export const SignInCredentials = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
  });

  if (result?.error) {
    toast.error(`Login failed: ${result.error}`);
  }

  return result;
};
