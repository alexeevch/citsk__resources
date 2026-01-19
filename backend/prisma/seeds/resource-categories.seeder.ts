import { PrismaClient } from '@prisma/client';

const data = [
  {
    name: 'official_website',
    label: 'Официальный сайт',
  },
  {
    name: 'mass_media',
    label: 'Средство массовой информации (СМИ)',
  },
  {
    name: 'gov_system',
    label: 'Государственная информационная система (ГИС)',
  },
  {
    name: 'other',
    label: 'Иное',
  },
];

export async function seedResourceCategories(prisma: PrismaClient) {
  for (const category of data) {
    await prisma.resourceCategory.upsert({
      where: { name: category.name },
      update: {
        name: category.name,
        label: category.label,
      },
      create: category,
    });
  }

  console.log('Resource Categories seeded successfully.');
}
