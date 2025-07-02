"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const FormSchema = z.object({
  username: z.string().max(24, {
    message: "Message cannot be over 24 characters.",
  }),
});

export function InputForm() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-xl space-y-4"
      >
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-slate-200 text-sm">
                Please Be Kind
              </FormLabel>
              <FormControl>
                <div className="relative flex w-full">
                  <Input
                    className="bg-slate-700 border border-slate-600 text-white placeholder:text-slate-400 pr-10 rounded-xl focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:outline-none transition-all"
                    placeholder="Enter your message"
                    {...field}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-400 hover:text-blue-300 transition"
                  >
                    <PaperPlaneIcon className="h-5 w-5" />
                  </button>
                </div>
              </FormControl>
              <FormDescription className="text-slate-400 text-xs">
                Your chats are public.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
