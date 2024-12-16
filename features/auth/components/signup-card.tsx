"use client";
import { Github } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTransition } from "react";

import { Google } from "@/components/icons/google";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { SignInFlow } from "@/lib/type";
import { SignInGithub, SignInGoogle } from "../actions/sign-in";
import { SignUp } from "../actions/sign-up";

const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

interface SignUpProps {
  setState: (state: SignInFlow) => void;
}

export const SignUpCard = ({ setState }: SignUpProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signUpSchema>) => {
    startTransition(async () => {
      try {
        const result = await SignUp({
          email: values.email,
          password: values.password,
        });
        toast.success(result.message);
      } catch (error) {
        toast.error("Failed to create an account");
        console.error("Failed to create an account", error);
      }
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Create a new account</CardTitle>
        <CardDescription>Use credentials or other options to</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-0 py-0">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      type="password"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full" type="submit" disabled={isPending}>
              Continue
            </Button>
          </form>
        </Form>

        <Separator />

        <div className="flex flex-col gap-2.5">
          <Button
            className="w-full relative"
            variant="outline"
            onClick={() => SignInGoogle()}
          >
            <Google className="absolute left-2.5 top-2.5" />
            Continue with Google
          </Button>
          <Button
            className="w-full relative"
            variant="outline"
            onClick={() => SignInGithub()}
          >
            <Github className="absolute left-2.5 top-2.5" /> Continue with
            Github
          </Button>
        </div>

        <p className="text-xs text-muted-foreground ">
          Already have an account?{" "}
          <Button
            variant="link"
            onClick={() => setState("sign-in")}
            className="text-sky-700 hover:underline cursor-pointer text-xs -ml-4"
          >
            Sign in
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};
