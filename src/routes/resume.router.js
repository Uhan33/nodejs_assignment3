import express from 'express';
import authMiddleware from '../middlewares/auth.middleware.js';
import { prisma } from '../utils/prisma/index.js';
import { ResumeController } from '../controllers/resume.controller.js';
import { ResumeService } from '../services/resume.service.js';
import { ResumeRepository } from '../repositories/resume.repository.js';

const router = express.Router();

const resumeRepository = new ResumeRepository(prisma);
const resumeService = new ResumeService(resumeRepository);
const resumeController = new ResumeController(resumeService);

router.post('/make-resume', authMiddleware, resumeController.makeResume);
router.get('/', authMiddleware, resumeController.findAllResumes);
router.get('/:resumeId', authMiddleware, resumeController.findResume);
router.patch('/:resumeId', authMiddleware, resumeController.updateResume);
router.delete('/:resumeId', authMiddleware, resumeController.deleteResume);

export default router;
