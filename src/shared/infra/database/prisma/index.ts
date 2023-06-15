import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient(
    {
        datasources: {
            db: {
                url: "postgresql://postgres:postgres@localhost:5432/data_dev?schema=public"
            }
        }
    }
);
export default prisma;
