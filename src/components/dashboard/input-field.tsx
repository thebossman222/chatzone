"use Client";

import { Form, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { SmilePlusIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { messages } from "@/app/dashboard/mockdata";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { toast } from "sonner";
import { Session } from "better-auth";
import { POST } from "@/lib/messages";

export function MessageInput({
  session,
  channelId,
}: {
  session?: Session | null;
  channelId: string;
}) {
  const formSchema = z.object({
    message: z
      .string()
      .min(5, `Message must be at least 5 characters long`)
      .max(56, `Message must be at most 56 characters`),
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
      const res = await POST({
        content: formData.message,
        channelId: channelId,
      });
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
