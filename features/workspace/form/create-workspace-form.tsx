"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createWorkspace } from "../actions/create-workspace";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const formSchema = z.object({
  name: z.string().min(3, "Workspace name should be 3 characters or more"),
});

export const CreateWorkspaceForm = ({ onClose }: { onClose: () => void }) => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { success, message, result } = await createWorkspace({
        name: values.name,
      });
      if (success) {
        toast.success(message);
        router.push(`/workspace/${result.id}`);
        onClose();
      } else {
        toast.error(message);
      }
    });
  };

  return (
    <div className="space-y-7">
      <Form {...form}>
        <form
          id="form"
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-7"
        >
          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="workspace name"
                    type="text"
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex justify-end space-x-5">
        <Button disabled={isPending} onClick={onClose} variant="outline">
          Cancel
        </Button>
        <Button disabled={isPending} type="submit" form="form">
          Submit
        </Button>
      </div>
    </div>
  );
};
