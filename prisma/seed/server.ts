import { Server } from "../../generated/prisma";
import { upsertChannel, upsertServer } from "./utils";

const servers: Server[] = [
  {
    id: crypto.randomUUID(),
    name: "General",
  },
  {
    id: crypto.randomUUID(),
    name: "Gaming",
  },
  {
    id: crypto.randomUUID(),
    name: "Music",
  },
  {
    id: crypto.randomUUID(),
    name: "Tech",
  },
];

export async function seedServerAndChannel() {
  const serversArray = await Promise.all(
    servers.map(
      (server) => (
        upsertServer(server.id, server.name),
        console.log(`Seeding Channel in Server: ${server.name}`),
        upsertChannel(server.id, "General")
      )
    )
  );
  console.log(`Seeded Servers!`);
  return serversArray;
}
