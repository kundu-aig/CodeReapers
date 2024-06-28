import express from 'express';
import imageUploader from "../../utils/imageUploader.js"
import {createCollateral,listCollateral}  from './collateral.controller.js';
import {checkForFiles} from '../../utils/index.js'


const router = express.Router();

// API routes
router.get(`/`,listCollateral);
router.post(`/`,checkForFiles, imageUploader.upload('large'),createCollateral);





// Export the router
export default router;