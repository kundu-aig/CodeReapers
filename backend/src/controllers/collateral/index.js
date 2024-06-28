import express from 'express';
import imageUploader from "../../utils/imageUploader.js"
import {createCollateral}  from './collateral.controller.js';


const router = express.Router();

// API routes
router.post(`/`, imageUploader.upload('large'),createCollateral);
// router.get(`/all`, getAllCollateral);



// Export the router
export default router;