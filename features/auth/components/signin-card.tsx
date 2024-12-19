"use client";
import { Github } from "lucide-react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import {
  SignInCredentials,
  SignInGithub,
  SignInGoogle,
} from "../actions/signin";
import { toast } from "sonner";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

interface SignInProps {
  setState: (state: SignInFlow) => void;
}

export const SignInCard = ({ setState }: SignInProps) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //TODO: add a better error handling from authorize credentials in auth.ts. idk what to do for now. the documentation sucks

  const onSubmit = async (values: z.infer<typeof signInSchema>) => {
    startTransition(async () => {
      try {
        await SignInCredentials(values);
        router.refresh();
      } catch (error) {
        toast.error("Incorrect credentials");
        console.log(error as string);
      }
    });
  };

  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle className="text-2xl">Login to continue</CardTitle>
        <CardDescription>
          Use credentials or other options to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-2 px-0 py-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email"
                      type="email"
                      disabled={form.formState.isSubmitting}
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
                      disabled={form.formState.isSubmitting}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              className="w-full"
              type="submit"
              disabled={form.formState.isSubmitting || isPending}
            >
              {form.formState.isSubmitting ? "Signing in..." : "Continue"}
            </Button>
            {form.formState.errors.root && (
              <p className="text-sm text-red-500">
                {form.formState.errors.root.message}
              </p>
            )}
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
          Don&apos;t have an account?{" "}
          <Button
            variant="link"
            onClick={() => setState("sign-up")}
            className="text-sky-700 hover:underline cursor-pointer text-xs -ml-4"
          >
            Sign up
          </Button>
        </p>
      </CardContent>
    </Card>
  );
};
