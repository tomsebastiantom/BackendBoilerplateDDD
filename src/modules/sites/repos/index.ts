import { SequelizeCheckpointRepo } from './implementations/sequelizeCheckpointRepo';
import { SequelizeSiteRepo } from './implementations/sequelizeSiteRepo';
import models from '../../../shared/infra/database/sequelize/models';

const checkpointRepo = new SequelizeCheckpointRepo(models);
const siteRepo = new SequelizeSiteRepo(models);

export { checkpointRepo, siteRepo };
