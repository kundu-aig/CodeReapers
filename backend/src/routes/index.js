import express from 'express';
import authRoutes  from '../controllers/auth/index.js';
import collateralRoutes from '../controllers/collateral/index.js'

const router = express.Router();

// API routes
router.use(`/auth`, authRoutes);
router.use(`/collateral`, collateralRoutes);


// Export the router
export default router;