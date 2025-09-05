import { PrismaClient } from "../../generated/prisma";

/*
 * Prisma Client instance for database interactions
 * Uses a singleton pattern to ensure only one instance is created
 * This is important for performance and to avoid exhausting database connections
 * In development, it attaches the instance to the global object to persist across module reloads
 * In production, it creates a new instance
 *   @returns {PrismaClient} The Prisma Client instance
 *   @throws Will throw an error if the Prisma Client cannot be instantiated
 */
const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
