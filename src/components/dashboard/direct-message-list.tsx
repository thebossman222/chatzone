import { MessageCircle } from "lucide-react";
import { ScrollArea } from "../ui/scroll-area";
import { dmContacts } from "@/app/dashboard/mockdata";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function MessageList() {
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
  </div>;
}
