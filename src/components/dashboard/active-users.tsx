import { activeUsers } from "@/app/dashboard/mockdata";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { Users } from "lucide-react";

export function ActiveUserSection() {
  return (
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
  );
}
