import express from 'express';


import { loginController } from '../../../useCases/user/login';
import { middleware, requestMiddleware } from '../../../../../shared/infra/http';
import { refreshAccessTokenController } from '../../../useCases/user/refreshAccessToken';
import { logoutController } from '../../../useCases/user/logout';
import { databaseService } from '../../../../../shared/services';
import { PrismaUserRepo } from '../../../repos/implementations/prismaUserRepo';
import { CreateUserUseCase } from '../../../useCases/user/createUser/CreateUserUseCase';
import { DeleteUserUseCase } from '../../../useCases/user/deleteUser/DeleteUserUseCase';
import { DecodedExpressRequest } from '../models/decodedRequest';
import { CreateUserController } from '../../../useCases/user/createUser/CreateUserController';
import { DeleteUserController } from '../../../useCases/user/deleteUser/DeleteUserController';
import { UpdateUserUseCase } from '../../../useCases/user/updateUser/UpdateUserUseCase';
import { UpdateUserController } from '../../../useCases/user/updateUser/UpdateUserController';


const userRouter = express.Router();


async function createPrismaUserRepo(req: DecodedExpressRequest) {
  const dbClient = await databaseService.getDBclient(req.decoded.tenantId as string);
  return new PrismaUserRepo(dbClient);
}

function generateController(useCaseClass, controllerClass) {
  return async (req, res) => {
    const prismaSiteRepo = await createPrismaUserRepo(req);
    const useCase = new useCaseClass(prismaSiteRepo);
    const controller = new controllerClass(useCase);
    controller.execute(req, res);
  };
}

const createUserHandler = generateController(CreateUserUseCase, CreateUserController);
const deleteUserHandler = generateController(DeleteUserUseCase, DeleteUserController);
const updateUserHandler = generateController(UpdateUserUseCase, UpdateUserController);


userRouter.post('/', middleware.ensureAuthenticated(), requestMiddleware.updateUserRequestParams(), createUserHandler);


userRouter.delete('/', middleware.ensureAuthenticated(),requestMiddleware.updateUserRequestParams(),deleteUserHandler);
userRouter.put('/', middleware.ensureAuthenticated(), requestMiddleware.updateUserRequestParams(),updateUserHandler);


userRouter.post('/login', (req, res) => loginController.execute(req, res));

userRouter.get('/logout', middleware.ensureAuthenticated(), (req, res) => logoutController.execute(req, res));

userRouter.post('/token/refresh', (req, res) => refreshAccessTokenController.execute(req, res));

export { userRouter };
