import express from 'express';
import UsersRouter from './users.router.js';
import ResumesRouter from './resume.router.js';

const router = express.Router();

router.use('/users/', UsersRouter);
router.use('/resumes/', ResumesRouter);

export default router;
