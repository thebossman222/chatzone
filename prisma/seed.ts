import prisma from "@/lib/prisma";
import { seedServerAndChannel } from "./seed/server";

async function main() {
  console.log(`Starting Database Seeding....`);

  // --- Delete Existing Data ---
  console.log(`Deleting Existing Data...`);
  await prisma.post.deleteMany({});
  await prisma.channel.deleteMany({});
  await prisma.server.deleteMany({});
  console.log(`✅ Existing Data Deleted`);
  // --- Finish Deleting Data ---

  // --- Seed Core Data ---
  console.log(`Seeding Core Data`);
  await seedServerAndChannel();
  console.log(`✅ Finished Seeding Core Data`);
  // --- Finish Seeding Data ---

  console.log(`✅ Finished Database Seeding! ✅`);
}

main()
  .catch((e) => {
    console.error(`An error has occured! Error Message: ${e}`);
    process.exit(1);
  })
  .finally(async () => {
    prisma.$disconnect();
    console.log("🔌 Prisma client disconnected.");
  });
