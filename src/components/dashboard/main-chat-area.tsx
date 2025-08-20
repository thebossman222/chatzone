"use client";
import { getMessages } from "@/lib/messages";
import { Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { Channel, Post } from "../../../generated/prisma";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ScrollArea } from "../ui/scroll-area";
import { MessageInput } from "./input-field";
import { Socket } from "socket.io-client";

type ChatType = {
  content: string;
};
export function MainChatArea({
  selectedChannel,
  socket,
}: {
  selectedChannel: Channel;
  socket: Socket;
}) {
  const [messages, setMessages] = useState<Post[]>([]);
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedChannel) {
        return;
      }
      try {
        const res = await getMessages({ channelId: selectedChannel.id });
        setMessages(res);
      } catch (error) {
        console.error("Failed to fetch messages", error);
      }
    };
    fetchMessages();
  }, [selectedChannel]);

  useEffect(() => {
    socket.on(`chat message`, (msg) => {
      messages.push({
        id: crypto.randomUUID(),
        content: msg.content,
        authorName: "Anonymous",
        postedDate: new Date().toISOString(),
      });
    });
  }, [socket]);

  return (
    <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-sm">
      {/* Chat Header */}
      <div className="p-4 bg-white/20 backdrop-blur-xl border-b border-white/30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Hash className="w-5 h-5 text-gray-700" />
          <h1 className="text-xl font-semibold text-gray-800">
            {selectedChannel?.name || `Select a Channel`}
          </h1>
          <Badge variant="secondary" className="bg-white/30 text-gray-700">
            3 online
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start gap-3 group">
              <Popover>
                <PopoverTrigger>
                  <Avatar className="w-10 h-10 shadow-lg hover:cursor-pointer">
                    <AvatarFallback
                      className={`bg-gradient-to-r bg-blue-500 text-white`}
                    >
                      {msg.authorName[0]}
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
                    {msg.authorName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(msg.postedDate).toLocaleDateString()}
                    {" • "}
                    {new Date(msg.postedDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-3 shadow-sm group-hover:scale group-hover:bg-white/40 transition-all duration-200">
                  <p className="text-gray-800">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <MessageInput channelId={selectedChannel?.id || ""} socket={socket} />
    </div>
  );
}
