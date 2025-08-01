import { Hash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";

import { messages } from "@/app/dashboard/mockdata";
import { redirect } from "next/navigation";
import { MessageInput } from "./input-field";
import { getSession } from "@/lib/session";
import { Session } from "better-auth";

export function MainChatArea({
  session,
  selectedServer,
  selectedChannel,
}: {
  session: Session;
  selectedServer: string;
  selectedChannel: string;
}) {
  return (
    <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-sm">
      {/* Chat Header */}
      <div className="p-4 bg-white/20 backdrop-blur-xl border-b border-white/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-800">
            {selectedServer}
          </h1>
          <Badge variant="secondary" className="bg-white/30 text-gray-700">
            3 online
          </Badge>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 group">
              <Popover>
                <PopoverTrigger>
                  <Avatar className="w-10 h-10 shadow-lg hover:cursor-pointer">
                    <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                    <AvatarFallback
                      className={`bg-gradient-to-r ${msg.color} text-white`}
                    >
                      {msg.user[0]}
                    </AvatarFallback>
                    <PopoverContent>
                      Place content for the popover here.
                    </PopoverContent>
                  </Avatar>
                </PopoverTrigger>
              </Popover>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-gray-800">
                    {msg.user}
                  </span>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-3 shadow-sm group-hover:scale group-hover:bg-white/40 transition-all duration-200">
                  <p className="text-gray-800">{msg.message}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <MessageInput session={session} channelId={selectedChannel} />
    </div>
  );
}
