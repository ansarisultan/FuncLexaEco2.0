import express from 'express';
import { logUsage, recent, summary } from '../controllers/usageController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/summary', authMiddleware, summary);
router.get('/recent', authMiddleware, recent);
router.post('/log', authMiddleware, logUsage);

export default router;
