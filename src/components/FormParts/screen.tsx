import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";

const messages = [
  {
    message: "Im hungry",
    user: "JoeSchnuggles",
    timestamp: "2023-10-01T12:00:00Z",
  },
  {
    message: "I want to eat pizza",
    user: "JaneDoe",
    timestamp: "2023-10-01T12:01:00Z",
  },
  {
    message: "I love pizza too!",
    user: "PizzaLover",
    timestamp: "2023-10-01T12:02:00Z",
  },
  {
    message: "What toppings do you like?",
    user: "ChefMaster",
    timestamp: "2023-10-01T12:03:00Z",
  },
  {
    message: "I like pepperoni and mushrooms",
    user: "Foodie123",
    timestamp: "2023-10-01T12:04:00Z",
  },
  {
    message: "I prefer vegetarian options",
    user: "GreenEater",
    timestamp: "2023-10-01T12:05:00Z",
  },
  {
    message: "Pineapple on pizza is the best!",
    user: "TropicalTaste",
    timestamp: "2023-10-01T12:06:00Z",
  },
  {
    message: "I disagree, pineapple doesn't belong on pizza",
    user: "ClassicPizzaFan",
    timestamp: "2023-10-01T12:07:00Z",
  },
  {
    message: "Let's agree to disagree on pineapple pizza",
    user: "NeutralParty",
    timestamp: "2023-10-01T12:08:00Z",
  },
  {
    message: "What about dessert? Any recommendations?",
    user: "SweetTooth",
    timestamp: "2023-10-01T12:09:00Z",
  },
  {
    message:
      "I love chocolate cake I love chocolate cake I love chocolate cake I love chocolate cake I love chocolate cake I love chocolate cake I love chocolate cake I love chocolate cake ",
    user: "ChocoLover",
    timestamp: "2023-10-01T12:10:00Z",
  },
];

export function MessageScreen() {
  return (
    <ScrollArea className="h-96 w-full max-w-full">
      <div className="space-y-4 px-4 py-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className="group relative flex flex-col items-start transition-transform duration-300 hover:scale-[1.02]"
          >
            <Label className="text-blue-800 text-xs pl-1">
              {msg.user} •{" "}
              {new Date(msg.timestamp).toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Label>

            <div
              className={`
                text-sm bg-white/90 text-slate-800 px-4 py-2
                min-md:rounded-full max-md:rounded-md shadow-md max-w-[80%] transition-all
                group-hover:scale-105 group-hover:shadow-lg
              `}
              style={{
                fontSize: `${14 - Math.min(index, 5) * 0.5}px`,
                opacity: `${1 - Math.min(index, 5) * 0.05}`,
              }}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
