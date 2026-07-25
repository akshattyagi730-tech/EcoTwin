import express from 'express';
import {
    getDashboard,
    getAnalytics,
    getMachines,
    getAlerts,
    resolveAlert,
    getPredictions,
    getRecommendations,
    handleChat,
    generateReport,
    getSettings
} from '../controllers/apiController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Apply auth protection to all domain routes
router.use(protect);

router.get('/dashboard/:factory_id', getDashboard);
router.get('/analytics', getAnalytics);
router.get('/machines', getMachines);
router.get('/alerts', getAlerts);
router.post('/alerts/:id/resolve', resolveAlert);
router.get('/predictions', getPredictions);
router.get('/recommendations', getRecommendations);
router.post('/chat', handleChat);
router.post('/reports', generateReport);
router.get('/settings', getSettings);

export default router;
