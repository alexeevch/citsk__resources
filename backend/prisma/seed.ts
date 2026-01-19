import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { seedOrganizations } from './seeds/organizations.seeder';
import { seedRoles } from './seeds/roles.seeder';
import { userRootSeeder } from './seeds/user-root.seeder';
import { seedResourceCategories } from './seeds/resource-categories.seeder';
import 'dotenv/config';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding Database...');

  await seedOrganizations(prisma);
  await seedResourceCategories(prisma);
  await seedRoles(prisma);
  await userRootSeeder(prisma);

  console.log('Database seeding finished!');
}

main()
  .catch((e) => {
    console.error('Seeding error', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
