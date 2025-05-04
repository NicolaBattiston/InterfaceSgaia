import { Pool, neonConfig } from '@neondatabase/serverless';
import { PrismaNeon }        from '@prisma/adapter-neon';
import { PrismaClient }      from '@prisma/client';
import ws                    from 'ws';
import 'dotenv/config';

neonConfig.webSocketConstructor = ws;

const pool    = new Pool({ connectionString: process.env.DATABASE_URL! });
const adapter = new PrismaNeon(pool);
const prisma  = new PrismaClient({ adapter });

(async () => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('🎉 Connessione OK');
  } catch (err) {
    console.error('❌ Connessione FAIL:', err);
  } finally {
    await prisma.$disconnect();
  }
})();
