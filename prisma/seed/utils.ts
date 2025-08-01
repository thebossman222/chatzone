import prisma from "@/lib/prisma";

export async function upsertServer(id: string, name: string) {
  return prisma.server.upsert({
    where: {
      id,
    },
    update: {
      // If found update these
      ...(name && { name }),
    },
    create: {
      id,
      name,
    },
  });
}

export async function upsertChannel(serverId: string, name: string) {
  return prisma.channel.upsert({
    where: {
      serverId_name: {
        serverId,
        name,
      },
    },
    update: {},
    create: {
      serverId,
      name,
    },
  });
}
