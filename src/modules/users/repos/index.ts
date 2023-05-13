
import { PrismaUserRepo } from './implementations/prismaUserRepo';
import prisma from '../../../shared/infra/database/prisma';

const userRepo  = new PrismaUserRepo(prisma);

export { userRepo };
