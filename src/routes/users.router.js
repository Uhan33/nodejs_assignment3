import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { prisma } from '../utils/prisma/index.js';
import { UsersController } from '../controllers/users.controller.js';
import { UsersService } from '../services/users.service.js';
import { UsersRepository } from '../repositories/users.repository.js';

const router = express.Router();

const usersRepository = new UsersRepository(prisma);
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router.post('/sign-up', usersController.signUp);
router.post('/sign-in', usersController.signIn);
router.get('/', authMiddleware, usersController.userInfo);
router.patch('/', authMiddleware, usersController.updateUserInfo);
router.delete('/', authMiddleware, usersController.deleteUser);
router.post('/refresh', usersController.refresh);

export default router;
