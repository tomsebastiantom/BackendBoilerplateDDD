

import { PrismaSiteRepo } from './implementations/prismaSiteRepo';
import { PrismaScanRepo } from './implementations/prismaScanRepo';

import prisma from '../../../shared/infra/database/prisma';



const siteRepo = new PrismaSiteRepo(prisma);
const scanRepo = new PrismaScanRepo(prisma);


export {

  siteRepo,
  scanRepo,
 
};
