"use client";

import { Hash } from "lucide-react";
import { useState } from "react";
import { channels, servers } from "../../app/dashboard/mockdata";
import { ActiveUserSection } from "./active-users";
import { MainChatArea } from "./main-chat-area";
import { Session } from "better-auth";

export function Dashboard({ session }: { session: Session }) {
  const [selectedServer, setSelectedServer] = useState("general");
  const [selectedChannel, setSelectedChannel] = useState("General");
  return (
    <div className="h-screen w-full bg-gradient-to-br from-sky-200 via-blue-200 to-cyan-200 flex overflow-hidden z-10">
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
                onClick={() => setSelectedChannel(channel.id)}
                className={`w-full p-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2 text-gray-700 hover:text-gray-900 ${
                  selectedChannel === channel.id
                    ? "bg-white/40 backdrop-blur-sm shadow-lg scale-105"
                    : "bg-white/10 hover:bg-white/20 hover:scale-102"
                }`}
              >
                <Hash className="w-4 h-4" />
                <span className="text-sm">{channel.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <MainChatArea
        session={session}
        selectedServer={selectedServer}
        selectedChannel={selectedChannel}
      />

      {/* Right Sidebar - Active Users */}
      <ActiveUserSection />
    </div>
  );
}
