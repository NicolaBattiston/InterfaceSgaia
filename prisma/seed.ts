// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

async function main() {
  const prisma = new PrismaClient();
  const passwordHash = await bcrypt.hash('password', 10);
  await prisma.user.deleteMany({
    where: { email: 'test@test.com' }
  });

  const user = await prisma.user.create({
    data: {
      name: 'Test',
      email: 'test@test.com',
      password: passwordHash,
    },
  });

  console.log('✅ Created user:', user);
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});