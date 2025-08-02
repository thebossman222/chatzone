"use client";

import { postMessage } from "@/lib/messages";
import { zodResolver } from "@hookform/resolvers/zod";
import { SmilePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function MessageInput({ channelId }: { channelId: string }) {
  const formSchema = z.object({
    message: z
      .string()
      .min(1, `Message cannot be empty`)
      .max(56, `Message must be at most 56 characters`)
      .trim(),
  });

  type schemaType = z.infer<typeof formSchema>;

  const form = useForm<schemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  async function onSubmit(formData: schemaType) {
    try {
      const res = await postMessage({
        content: formData.message,
        channelId: channelId,
      });
      form.reset();
      toast.success(`Message Posted! ${res.newMessage.content}`);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error(`An unknown error has occured`);
      }
    }
  }

  return (
    <div className="p-4 bg-white/20 backdrop-blur-xl border-t border-white/30">
      <div className="flex gap-3">
        <div className="flex-1 relative ">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex w-full items-center gap-2">
                      <Input
                        {...field}
                        placeholder="Type a message..."
                        autoComplete="off"
                        className="bg-white/30 backdrop-blur-sm border-white/40 rounded-2xl px-auto text-gray-800 placeholder:text-gray-600"
                      />
                      <Popover>
                        <PopoverTrigger>
                          <SmilePlusIcon className="hover:cursor-pointer hover:text-blue-500 hover:size-8 transition-all" />
                        </PopoverTrigger>
                        <PopoverContent>Hi Ben!</PopoverContent>
                      </Popover>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
