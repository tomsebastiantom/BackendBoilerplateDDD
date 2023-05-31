
import { PrismaCheckpointRepo } from './implementations/prismaCheckpointRepo';
import { PrismaSiteRepo } from './implementations/prismaSiteRepo';
import { PrismaScanRepo } from './implementations/prismaScanRepo';
import { PrismaGuardReportRepo } from './implementations/prismaGuardReportRepo';
import { PrismaIncidentReportRepo } from './implementations/prismaIncidentReportRepo';
import prisma from '../../../shared/infra/database/prisma';


const checkpointRepo = new PrismaCheckpointRepo(prisma);
const siteRepo = new PrismaSiteRepo(prisma);
const scanRepo = new PrismaScanRepo(prisma);
const guardReportRepo = new PrismaGuardReportRepo(prisma);
const incidentReportRepo = new PrismaIncidentReportRepo(prisma);


export {
  checkpointRepo,
  siteRepo,
  scanRepo,
  guardReportRepo,
  incidentReportRepo
};
