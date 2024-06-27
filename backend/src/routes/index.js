import express from 'express';
import authRoutes  from '../controllers/auth/index.js';


const router = express.Router();

// API routes
router.use(`/auth`, authRoutes);


// Export the router
export default router;