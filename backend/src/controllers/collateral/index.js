import express from 'express';
import {createCollateral}  from './collateral.controller.js';


const router = express.Router();

// API routes
router.post(`/`, createCollateral);


// Export the router
export default router;