import express from 'express';
import { createUserController } from '../../../useCases/user/createUser';
import { deleteUserController } from '../../../useCases/user/deleteUser';
import { getUserByUserNameController } from '../../../useCases/user/getUserByUserName';
import { loginController } from '../../../useCases/user/login';
import { middleware } from '../../../../../shared/infra/http';
import { getCurrentUserController } from '../../../useCases/user/getCurrentUser';
import { refreshAccessTokenController } from '../../../useCases/user/refreshAccessToken';
import { logoutController } from '../../../useCases/user/logout';

const userRouter = express.Router();

userRouter.post('/', (req, res) => {
  createUserController.execute(req, res);
});

userRouter.get('/me', middleware.ensureAuthenticated(), (req, res) =>
  getCurrentUserController.execute(req, res)
);

userRouter.post('/login', (req, res) => loginController.execute(req, res));

userRouter.post('/logout', middleware.ensureAuthenticated(), (req, res) =>
  logoutController.execute(req, res)
);

userRouter.post('/token/refresh', (req, res) =>
  refreshAccessTokenController.execute(req, res)
);

userRouter.delete('/:userId', middleware.ensureAuthenticated(), (req, res) =>
  deleteUserController.execute(req, res)
);

userRouter.get('/:username', middleware.ensureAuthenticated(), (req, res) =>
  getUserByUserNameController.execute(req, res)
);

export { userRouter };
