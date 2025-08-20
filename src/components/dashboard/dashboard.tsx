"use client";

import { getChannels } from "@/lib/channels";
import { getServers } from "@/lib/servers";
import { Hash } from "lucide-react";
import { useEffect, useState } from "react";
import { Channel, Server } from "../../../generated/prisma";
import { ActiveUserSection } from "./active-users";
import { MainChatArea } from "./main-chat-area";
import { io, Socket } from "socket.io-client";

export function Dashboard() {
  const [servers, setServers] = useState<Server[]>([]);
  const [channels, setChannels] = useState<Channel[]>([]);
  const [selectedServer, setSelectedServer] = useState<Server | null>(null);
  const [selectedChannel, setSelectedChannel] = useState<Channel | null>(null);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:3001`, {});
    setSocket(newSocket);
    return () => {
      socket?.disconnect();
    };
  }, [selectedChannel]);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const res = await getServers();

        setServers(res);
        if (selectedServer === null && res.length > 0) {
          setSelectedServer(res[0]);
        }
      } catch (error) {
        console.error("Failed to fetch servers", error);
      }
    };
    fetchServers();
  }, []);

  useEffect(() => {
    const fetchChannels = async () => {
      if (!selectedServer) {
        return;
      }
      try {
        const res = await getChannels({ serverId: selectedServer.id });
        setChannels(res);
        setSelectedChannel(res[0]);
      } catch (error) {
        console.error("Failed to fetch channels", error);
      }
    };
    fetchChannels();

    // Set the interval to refresh every 10 seconds
    const interval = setInterval(() => {
      fetchChannels();
    }, 10000);

    // Cleanup on unmount or when selectedServer changes
    return () => clearInterval(interval);
  }, [selectedServer]);

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
            {servers?.map((server) => (
              <button
                key={server.id}
                onClick={() => setSelectedServer(server)}
                className={`w-full p-3 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                  selectedServer === server
                    ? "bg-white/40 backdrop-blur-sm shadow-lg scale-105"
                    : "bg-white/10 hover:bg-white/20 hover:scale-102"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold shadow-lg`}
                >
                  <p className="text-xs">⭐</p>
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
            {channels?.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setSelectedChannel(channel)}
                className={`w-full p-2 rounded-lg hover:bg-white/20 transition-all duration-200 flex items-center gap-2 text-gray-700 hover:text-gray-900 ${
                  selectedChannel === channel
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
        selectedChannel={selectedChannel ? selectedChannel : channels[0]}
        socket={socket ? socket : io()}
      />

      {/* Right Sidebar - Active Users */}
      <ActiveUserSection />
    </div>
  );
}
