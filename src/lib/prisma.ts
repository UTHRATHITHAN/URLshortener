import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

//You might be wondering why we don’t simply create an instance of the Prisma Client whenever we need it. Well, while that approach works, it leads to creating a new database connection for every interaction.
// This can be inefficient and resource-intensive. In contrast, by creating a singleton instance of the Prisma Client, we establish a single connection that is reused throughout the application. This optimizes performance, minimizes overhead, and ensures consistent and efficient database operations.