

import { PrismaSiteRepo } from './implementations/prismaSiteRepo';


import prisma from '../../../shared/infra/database/prisma';



const siteRepo = new PrismaSiteRepo(prisma);



export {

  siteRepo,

};
