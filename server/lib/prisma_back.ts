
// server/lib/prisma.ts
import { PrismaClient }   from '@prisma/client';
import { PrismaNeon }     from '@prisma/adapter-neon';
import { neonConfig }     from '@neondatabase/serverless';
import ws                 from 'ws';

// Ensure the Neon driver uses ws in environments that need it
neonConfig.webSocketConstructor = ws;

// Create the adapter using the new v6 API
const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_URL!, 
  // you can also pass things like `previewFeatures` here if needed
});

// Use a singleton pattern so we don’t spin up multiple clients in dev
const globalWithPrisma = globalThis as unknown & { prisma?: PrismaClient };
export const prisma = globalWithPrisma.prisma 
  ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== 'production') {
  globalWithPrisma.prisma = prisma;
}
