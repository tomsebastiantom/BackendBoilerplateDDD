import express from 'express';
import { createUserController } from '../../../useCases/user/createUser';
import { deleteUserController } from '../../../useCases/user/deleteUser';
import { getUserByUserNameController } from '../../../useCases/user/getUserByUserName';
import { loginController } from '../../../useCases/user/login';
import { middleware } from '../../../../../shared/infra/http';
import { getCurrentUserController } from '../../../useCases/user/getCurrentUser';
import { refreshAccessTokenController } from '../../../useCases/user/refreshAccessToken';
import { logoutController } from '../../../useCases/user/logout';
import { databaseService } from '../../../../../shared/services';
import { PrismaUserRepo } from '../../../repos/implementations/prismaUserRepo';
import { CreateUserUseCase } from '../../../useCases/user/createUser/CreateUserUseCase';
import { DeleteUserUseCase } from '../../../useCases/user/deleteUser/DeleteUserUseCase';
import { DecodedExpressRequest } from '../models/decodedRequest';
import { CreateUserController } from '../../../useCases/user/createUser/CreateUserController';
import { DeleteUserController } from '../../../useCases/user/deleteUser/DeleteUserController';

const userRouter = express.Router();

userRouter.post(
  '/',
  middleware.ensureAuthenticated(),
  async (req: DecodedExpressRequest, res) => {
    const prismaUserRepo = new PrismaUserRepo(
      await databaseService.getDBclient(req.decoded.tenantId as string)
    );
    const createUserUseCase = new CreateUserUseCase(prismaUserRepo);
    const createUserController = new CreateUserController(createUserUseCase);
    createUserController.execute(req, res);
  }
);

// userRouter.get('/me', middleware.ensureAuthenticated(), (req, res) =>
//   getCurrentUserController.execute(req, res)
// );

userRouter.post('/login', (req, res) => loginController.execute(req, res));

userRouter.post('/logout', middleware.ensureAuthenticated(), (req, res) =>
  logoutController.execute(req, res)
);

userRouter.post('/token/refresh', (req, res) =>
  refreshAccessTokenController.execute(req, res)
);

userRouter.delete(
  '/:userId',
  middleware.ensureAuthenticated(),
  async (req: DecodedExpressRequest, res) => {
    const prismaUserRepo = new PrismaUserRepo(
      await databaseService.getDBclient(req.decoded.tenantId as string)
    );
    const deleteUserUseCase = new DeleteUserUseCase(prismaUserRepo);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    deleteUserController.execute(req, res);
  }
);

// userRouter.get('/:username', middleware.ensureAuthenticated(), (req, res) =>
//   getUserByUserNameController.execute(req, res)
// );

export { userRouter };
