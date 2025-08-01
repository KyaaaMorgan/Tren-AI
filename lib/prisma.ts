import { PrismaClient } from '@prisma/client';

declare global {
  // Prevents multiple instances in development
  var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;

export default prisma;
