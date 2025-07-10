"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Hash,
  MessageCircle,
  Send,
  Settings,
  Users,
  Mic,
  MicOff,
  Headphones,
  Menu,
  X,
  ArrowLeft,
} from "lucide-react";
import {
  activeUsers,
  channels,
  dmContacts,
  messages,
  servers,
} from "./mockdata";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

export default function Dashboard() {
  const [selectedServer, setSelectedServer] = useState("general");
  const [message, setMessage] = useState("");
  const [isMuted, setIsMuted] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [showUserList, setShowUserList] = useState(false);
  const [mobileView, setMobileView] = useState<"chat" | "sidebar" | "users">(
    "chat"
  );
  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage("");
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-sky-200 via-blue-200 to-cyan-200 flex overflow-hidden z-10">
      {/* Left Sidebar - Servers & DMs */}
      <div className="max-md:hidden w-80 bg-white/20 backdrop-blur-xl border-r border-white/30 flex flex-col">
        {/* Server List */}
        <div className="p-4 border-b border-white/20">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            Servers
          </h2>
          <div className="space-y-2">
            {servers.map((server) => (
              <button
                key={server.id}
                onClick={() => setSelectedServer(server.id)}
                className={`w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  selectedServer === server.id
                    ? "bg-white/40 backdrop-blur-sm shadow-lg scale-105"
                    : "bg-white/10 hover:bg-white/20 hover:scale-102"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r ${server.color} flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  {server.icon}
                </div>
                <span className="font-medium text-gray-800">{server.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div className="p-4 border-b border-white/20">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
            Channels
          </h3>
          <div className="space-y-1">
            {channels.map((channel) => (
              <button
                key={channel.id}
                className="w-full p-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2 text-gray-700 hover:text-gray-900"
              >
                {channel.type === "text" ? (
                  <Hash className="w-4 h-4" />
                ) : (
                  <Headphones className="w-4 h-4" />
                )}
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Direct Messages */}
        <div className="flex-1 p-4">
          <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Direct Messages
          </h3>
          <ScrollArea className="h-full">
            <div className="space-y-2">
              {dmContacts.map((contact) => (
                <button
                  key={contact.id}
                  className="w-full p-3 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-3"
                >
                  <div className="relative">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={contact.avatar || "/placeholder.svg"} />
                      <AvatarFallback>{contact.name[0]}</AvatarFallback>
                    </Avatar>
                    <div
                      className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        contact.status === "online"
                          ? "bg-green-400"
                          : contact.status === "away"
                          ? "bg-yellow-400"
                          : "bg-gray-400"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 text-left">
                    <div className="text-sm font-medium text-gray-800">
                      {contact.name}
                    </div>
                    <div className="text-xs text-gray-600 truncate">
                      {contact.lastMessage}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/10 backdrop-blur-sm">
        {/* Chat Header */}
        <div className="p-4 bg-white/20 backdrop-blur-xl border-b border-white/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Hash className="w-5 h-5 text-gray-700" />
            <h1 className="text-xl font-semibold text-gray-800">general</h1>
            <Badge variant="secondary" className="bg-white/30 text-gray-700">
              {activeUsers.filter((u) => u.status === "online").length} online
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMuted(!isMuted)}
              className="bg-white/20 hover:bg-white/30"
            >
              {isMuted ? (
                <MicOff className="w-4 h-4" />
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="bg-white/20 hover:bg-white/30"
            >
              <Settings className="w-4 h-4" />
            </Button>
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
        <div className="p-4 bg-white/20 backdrop-blur-xl border-t border-white/30">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="bg-white/30 backdrop-blur-sm border-white/40 rounded-2xl pr-12 text-gray-800 placeholder:text-gray-600"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <Button
                onClick={handleSendMessage}
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 rounded-xl shadow-lg"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Active Users */}
      <div className="max-md:hiddenw-64 bg-white/20 backdrop-blur-xl border-l border-white/30 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-gray-700" />
          <h2 className="text-lg font-semibold text-gray-800">Active Users</h2>
        </div>
        <ScrollArea className="h-full">
          <div className="space-y-3">
            {activeUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/20 transition-all duration-200"
              >
                <div className="relative">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                      user.status === "online"
                        ? "bg-green-400"
                        : user.status === "away"
                        ? "bg-yellow-400"
                        : user.status === "dnd"
                        ? "bg-red-400"
                        : "bg-gray-400"
                    }`}
                  ></div>
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    {user.name}
                  </div>
                  <div className="text-xs text-gray-600">{user.activity}</div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
